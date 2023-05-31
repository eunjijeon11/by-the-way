import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import {
  Input,
  Stack,
  Button,
  ButtonGroup,
  Center,
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { TbMapSearch, TbPlus, TbTrashX, TbSearch } from "react-icons/tb";

interface Waypoint {
  name: string;
  lat: number;
  lon: number;
}

interface WaypointNode {
  waypoint: Waypoint;
  next: WaypointNode | null;
}

export default function Home() {
  const router: NextRouter = useRouter();

  const [head, setHead] = useState<WaypointNode | null>(null);
  const [tail, setTail] = useState<WaypointNode | null>(null);
  const [list, setList] = useState<Waypoint[]>([]);

  const addWaypoint = () => {
    if (list.length < 3) {
      const newWaypoint = { name: `경유지${list.length + 1}`, lat: 0, lon: 0 };
      setList((prevList: Waypoint[]) => {
        const updatedList = [...prevList, newWaypoint];
        if (!head) {
          const newNode = { waypoint: newWaypoint, next: null };
          setHead(newNode);
          setTail(newNode);
        } else {
          if (tail) {
            const newNode = { waypoint: newWaypoint, next: null };
            tail.next = newNode;
            setTail(newNode);
          } else {
            console.error("Tail is null.");
          }
        }
        return updatedList;
      });
    }
  };

  const deleteWaypoint = () => {
    setList((prevList: Waypoint[]) => {
      if (prevList.length > 0) {
        if (!head || !head.next) {
          setHead(null);
          setTail(null);
        } else {
          let current = head;
          while (current.next && current.next !== tail) {
            current = current.next;
          }
          if (current.next === tail) {
            current.next = null;
            setTail(current);
          }
        }

        const updatedList = prevList.slice(0, prevList.length - 1);
        return updatedList;
      }
      return prevList;
    });
  };

  const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSearch = async () => {
    const startPoint = document.getElementById(
      "startPoint"
    ) as HTMLInputElement;
    const endPoint = document.getElementById("endPoint") as HTMLInputElement;
    const waypoints = document.querySelectorAll(
      ".waypoint"
    ) as NodeListOf<HTMLInputElement>;

    const start = startPoint.value;
    const waypointsArray: Waypoint[] = Array.from(waypoints).map((waypoint) => {
      return { name: waypoint.value, lat: 0, lon: 0 };
    });
    const end = endPoint.value;

    try {
      const startCoords = await searchAddress(start);
      const waypointCoords = await Promise.all(
        waypointsArray.map(async (waypoint) => {
          const coords = await searchAddress(waypoint.name);
          if (coords) {
            return {
              ...waypoint,
              name: coords.name,
              lat: coords.lat,
              lon: coords.lon,
            };
          }
          return waypoint;
        })
      );
      const endCoords = await searchAddress(end);

      const startName = startCoords ? startCoords.name : "";
      const endName = endCoords ? endCoords.name : "";

      const startNode: WaypointNode = {
        waypoint: {
          name: startName,
          lat: startCoords?.lat || 0,
          lon: startCoords?.lon || 0,
        },
        next: null,
      };
      const endNode: WaypointNode = {
        waypoint: {
          name: endName,
          lat: endCoords?.lat || 0,
          lon: endCoords?.lon || 0,
        },
        next: null,
      };

      if (!head) {
        setHead(startNode);
        setTail(endNode);
      } else if (head && tail) {
        startNode.next = head;
        tail.next = endNode;
        setHead(startNode);
        setTail(endNode);
      }

      if (waypointCoords.length > 0) {
        let prevNode: WaypointNode | null = startNode;
        for (let i = 0; i < waypointCoords.length; i++) {
          const waypoint = waypointCoords[i];
          const newNode: WaypointNode = { waypoint, next: null };
          if (prevNode) {
            prevNode.next = newNode;
          }
          prevNode = newNode;
        }
        prevNode.next = endNode;
      }

      const length = getLength();
      const waypointsData = [];

      let current: WaypointNode | null = startNode;
      while (current) {
        waypointsData.push(current.waypoint);
        current = current.next;
      }

      localStorage.setItem("length", length.toString());
      localStorage.setItem("Data", JSON.stringify(waypointsData));

      router.push({
        pathname: "/suggest",
      });
      console.log("length", length);
      console.log("Data:", waypointsData);
    } catch (error) {
      console.error("Error getting coordinates:", error);
    }
  };

  const searchAddress = async (
    keyword: string
  ): Promise<{ name: string; lat: number; lon: number } | null> => {
    try {
      const apiKey = "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy";
      const response = await axios.get(
        "https://apis.openapi.sk.com/tmap/pois",
        {
          params: {
            version: 1,
            format: "json",
            appKey: apiKey,
            searchKeyword: keyword,
            resCoordType: "WGS84GEO",
            reqCoordType: "WGS84GEO",
            count: 1,
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      const pois = response.data.searchPoiInfo.pois.poi;
      if (pois.length > 0) {
        const poi = pois[0];
        const name = poi.name;
        const latitude = poi.noorLat;
        const longitude = poi.noorLon;

        console.log("이름:", name);
        console.log("위도:", latitude);
        console.log("경도:", longitude);

        return { name, lat: latitude, lon: longitude };
      }

      return null;
    } catch (error) {
      console.error(
        "주소를 검색하고 좌표를 얻어오는 중 오류가 발생했습니다.",
        error
      );
      throw error;
    }
  };

  const getLength = (): number => {
    if (!head) {
      return 0;
    }

    let current: WaypointNode | null = head;
    let count = 1;

    while (current !== tail && current.next) {
      current = current.next;
      count++;
    }

    return count;
  };

  const printLinkedList = (head: WaypointNode | null) => {
    let current = head;
    const list = [];

    while (current) {
      list.push(current.waypoint);
      current = current.next;
    }

    return list;
  };

  return (
    <Flex flexDirection="column" h="100vh">
      <Flex
        w="100vw"
        h="60px"
        bg="gray.50"
        shadow="md"
        alignItems="center"
        px="70px"
      >
        <TbMapSearch size="28px" />
        <Text color="gray.700" mx="3">
          By The Way
        </Text>
        <Spacer />
        <Button
          leftIcon={<AiFillGithub size="20px" />}
          onClick={() => {
            window.open("https://github.com/comedu-cute-members/by-the-way");
          }}
        >
          GitHub
        </Button>
      </Flex>
      <Center w="100vw" flex="1" paddingBottom="5">
        <Stack alignItems="center">
          <ButtonGroup
            variant="outline"
            spacing="6"
            style={{ marginBottom: "15px" }}
          >
            <Button
              height="60px"
              m="15px"
              colorScheme="blue"
              variant="solid"
              fontSize="25px"
              leftIcon={<TbPlus />}
              onClick={addWaypoint}
            >
              경유지추가
            </Button>
            <Button
              height="60px"
              m="15px"
              colorScheme="red"
              variant="solid"
              fontSize="25px"
              leftIcon={<TbTrashX />}
              onClick={deleteWaypoint}
            >
              경유지삭제
            </Button>
          </ButtonGroup>
          <Input
            id="startPoint"
            ml="15px"
            w="25vw"
            h="70px"
            placeholder="출발지"
            fontSize="30px"
          />
          <Stack m="15px" spacing={3}>
            {list.map((waypoint, index) => (
              <Input
                key={`waypoint${index}`}
                className="waypoint"
                id={`waypoint${index}`}
                w="25vw"
                h="70px"
                fontSize="30px"
                placeholder={`경유지${index + 1}`}
              />
            ))}
          </Stack>
          <Input
            id="endPoint"
            ml="15px"
            w="25vw"
            h="70px"
            placeholder="도착지"
            fontSize="30px"
          />
          <Button
            height="60px"
            width="250px"
            fontSize="25px"
            m="15px"
            leftIcon={<TbSearch />}
            onClick={handleSearch}
          >
            경로 검색하기
          </Button>
        </Stack>
      </Center>
    </Flex>
  );
}

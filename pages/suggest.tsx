import "../styles/suggest.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Center } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { SimpleGrid, Heading, Text } from "@chakra-ui/react";

function sendMethod(query, method: any, length: number) {
  var query2: any = {};
  const route = [];
  for (var i = 0; i < length + 1; i++) {
    route.push(method[i]);
    route[i].legs[0].start.name = query.waypointsData[i].name;
    route[i].legs[route[i].legs.length - 1].end.name =
      query.waypointsData[i + 1].name;
  }
  query2.routes = route;
  query2.walk = method[6];
  query2.transfer = method[7];
  query2.cost = method[8];
  query2.time = method[9];
  console.log(query2);
  return query2;
}

export default function Suggestion() {
  const router = useRouter();

  const query = {
    length: 0,
    waypointsData: [],
  };

  query.length = parseFloat(localStorage.getItem("length"));
  query.waypointsData = JSON.parse(localStorage.getItem("Data"));

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      startX: query.waypointsData[0].lon,
      startY: query.waypointsData[0].lat,
      endX: query.waypointsData[1].lon,
      endY: query.waypointsData[1].lat,
      lang: 0,
      format: "json",
      count: 10,
    }),
  };

  const [data1, setData1] = useState(null);
  const [isLoading1, setIsloading1] = useState(true);

  const [data2, setData2] = useState(null);
  const [isLoading2, setIsloading2] = useState(true);

  const [data3, setData3] = useState(null);
  const [isLoading3, setIsloading3] = useState(true);

  const [data4, setData4] = useState(null);
  const [isLoading4, setIsloading4] = useState(true);

  const [data5, setData5] = useState(null);
  const [isLoading5, setIsloading5] = useState(true);

  const [data6, setData6] = useState(null);
  const [isLoading6, setIsloading6] = useState(true);

  var via = query.length; //경유지 개수(앞에서 받아오기)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://apis.openapi.sk.com/transit/routes",
          options
        );
        const json = await response.json();
        setData1(json);
        setIsloading1(false);
      } catch (error) {
        console.error(error);
        setIsloading1(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startX: query.waypointsData[1].lon,
          startY: query.waypointsData[1].lat,
          endX: query.waypointsData[2].lon,
          endY: query.waypointsData[2].lat,
          lang: 0,
          format: "json",
          count: 10,
        }),
      };
      try {
        const response = await fetch(
          "https://apis.openapi.sk.com/transit/routes",
          options
        );
        const json = await response.json();
        setData2(json);
        setIsloading2(false);
      } catch (error) {
        console.error(error);
        setIsloading2(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (via - 1 > 0) {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            startX: query.waypointsData[2].lon,
            startY: query.waypointsData[2].lat,
            endX: query.waypointsData[3].lon,
            endY: query.waypointsData[3].lat,
            lang: 0,
            format: "json",
            count: 10,
          }),
        };
        try {
          const response = await fetch(
            "https://apis.openapi.sk.com/transit/routes",
            options
          );
          const json = await response.json();
          setData3(json);
          setIsloading3(false);
        } catch (error) {
          console.error(error);
          setIsloading3(false);
        }
      } else {
        setIsloading3(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (via - 2 > 0) {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            startX: query.waypointsData[3].lon,
            startY: query.waypointsData[3].lat,
            endX: query.waypointsData[4].lon,
            endY: query.waypointsData[4].lat,
            lang: 0,
            format: "json",
            count: 10,
          }),
        };
        try {
          const response = await fetch(
            "https://apis.openapi.sk.com/transit/routes",
            options
          );
          const json = await response.json();
          setData4(json);
          setIsloading4(false);
        } catch (error) {
          console.error(error);
          setIsloading4(false);
        }
      } else {
        setIsloading4(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (via - 3 > 0) {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            startX: query.waypointsData[4].lon,
            startY: query.waypointsData[4].lat,
            endX: query.waypointsData[5].lon,
            endY: query.waypointsData[5].lat,
            lang: 0,
            format: "json",
            count: 10,
          }),
        };
        try {
          const response = await fetch(
            "https://apis.openapi.sk.com/transit/routes",
            options
          );
          const json = await response.json();
          setData5(json);
          setIsloading5(false);
        } catch (error) {
          console.error(error);
          setIsloading5(false);
        }
      } else {
        setIsloading5(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (via - 4 > 0) {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            startX: query.waypointsData[5].lon,
            startY: query.waypointsData[5].lat,
            endX: query.waypointsData[6].lon,
            endY: query.waypointsData[6].lat,
            lang: 0,
            format: "json",
            count: 10,
          }),
        };
        try {
          const response = await fetch(
            "https://apis.openapi.sk.com/transit/routes",
            options
          );
          const json = await response.json();
          setData6(json);
          setIsloading6(false);
        } catch (error) {
          console.error(error);
          setIsloading6(false);
        }
      } else {
        setIsloading6(false);
      }
    }
    fetchData();
  }, []);

  if (
    isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading6
  ) {
    return <div> Loading... </div>;
  }

  const dataList = [];
  dataList.push(data2);
  if (via - 1 > 0) {
    dataList.push(data3);
  }
  if (via - 2 > 0) {
    dataList.push(data4);
  }
  if (via - 3 > 0) {
    dataList.push(data5);
  }
  if (via - 4 > 0) {
    dataList.push(data6);
  }

  const itinerary = data1.metaData.plan.itineraries;
  const method1 = new Array(10); //time1
  const method2 = new Array(10); //time2
  const method3 = new Array(10); //time3
  const method4 = new Array(10); //transfer1
  const method5 = new Array(10); //fare1

  //time sort
  itinerary.sort(function (a: any, b: any) {
    return a.totalTime - b.totalTime;
  });
  method1[0] = itinerary[0];
  method2[0] = itinerary[1];
  method3[0] = itinerary[2];
  method1[6] = itinerary[0].totalWalkTime;
  method2[6] = itinerary[1].totalWalkTime;
  method3[6] = itinerary[2].totalWalkTime;
  method1[7] = itinerary[0].transferCount;
  method2[7] = itinerary[1].transferCount;
  method3[7] = itinerary[2].transferCount;
  method1[8] = itinerary[0].fare.regular.totalFare;
  method2[8] = itinerary[1].fare.regular.totalFare;
  method3[8] = itinerary[2].fare.regular.totalFare;
  method1[9] = itinerary[0].totalTime;
  method2[9] = itinerary[1].totalTime;
  method3[9] = itinerary[2].totalTime;
  //transfer sort
  itinerary.sort(function (a: any, b: any) {
    if (a.transferCount == b.transferCount) return a.totalTime - b.totalTime;
    return a.transferCount - b.transferCount;
  });
  method4[0] = itinerary[0];
  method4[6] = itinerary[0].totalWalkTime;
  method4[7] = itinerary[0].transferCount;
  method4[8] = itinerary[0].fare.regular.totalFare;
  method4[9] = itinerary[0].totalTime;
  //fare sort
  itinerary.sort(function (a: any, b: any) {
    if (a.fare.regular.totalFare == b.fare.regular.totalFare)
      return a.totalTime - b.totalTime;
    return a.fare.regular.totalFare - b.fare.regular.totalFare;
  });
  method5[0] = itinerary[0];
  method5[6] = itinerary[0].totalWalkTime;
  method5[7] = itinerary[0].transferCount;
  method5[8] = itinerary[0].fare.regular.totalFare;
  method5[9] = itinerary[0].totalTime;

  for (var i = 0; i < via; i++) {
    var second_flag = 1; //time_2 결정할 때 method2가 날아가는 경우
    //실제로는 이 부분에서 api 활용해서 json 파일 받아오기

    const itinerary2 = dataList[i].metaData.plan.itineraries;

    itinerary2.sort(function (a: any, b: any) {
      return a.totalTime - b.totalTime;
    });

    method1[i + 1] = itinerary2[0]; //time_1
    method1[6] += itinerary2[0].totalWalkTime;
    method1[7] += itinerary2[0].transferCount;
    method1[8] += itinerary2[0].fare.regular.totalFare;
    method1[9] += itinerary2[0].totalTime;

    if (
      method2[9] + itinerary2[0].totalTime >
      method1[9] + itinerary2[1].totalTime
    ) {
      //time_2
      second_flag = 0;
      var temp = JSON.parse(JSON.stringify(method2));
      for (var j = 0; j < 10; j++) method2[j] = method1[j];
      method2[6] += itinerary2[1].totalWalkTime;
      method2[7] += itinerary2[1].transferCount;
      method2[8] += itinerary2[1].fare.regular.totalFare;
      method2[9] += itinerary2[1].totalTime;
      method2[i + 1] = itinerary2[1];
    } else {
      method2[i + 1] = itinerary2[0];
      method2[6] += itinerary2[0].totalWalkTime;
      method2[7] += itinerary2[0].transferCount;
      method2[8] += itinerary2[0].fare.regular.totalFare;
      method2[9] += itinerary2[0].totalTime;
    }

    if (second_flag) {
      //time_3
      if (
        method3[9] + itinerary2[0].totalTime >
        method1[9] + itinerary2[1].totalTime
      ) {
        for (var j = 0; j < 10; j++) method3[j] = method1[j];
        method3[6] += itinerary2[1].totalWalkTime;
        method3[7] += itinerary2[1].transferCount;
        method3[8] += itinerary2[1].fare.regular.totalFare;
        method3[9] += itinerary2[1].totalTime;
        method3[i + 1] = itinerary2[1];
      } else {
        method3[i + 1] = itinerary2[0];
        method3[6] += itinerary2[0].totalWalkTime;
        method3[7] += itinerary2[0].transferCount;
        method3[8] += itinerary2[0].fare.regular.totalFare;
        method3[9] += itinerary2[0].totalTime;
      }
    } else {
      if (
        temp[9] + itinerary2[0].totalTime >
        method1[9] + itinerary2[2].totalTime
      ) {
        for (var j = 0; j < 10; j++) method3[j] = method1[j];
        method3[6] += itinerary2[2].totalWalkTime;
        method3[7] += itinerary2[2].transferCount;
        method3[8] += itinerary2[2].fare.regular.totalFare;
        method3[9] += itinerary2[2].totalTime;
        method3[i + 1] = itinerary2[2];
      } else {
        for (var j = 0; j < 10; j++) method3[j] = temp[j];
        method3[6] += itinerary2[0].totalWalkTime;
        method3[7] += itinerary2[0].transferCount;
        method3[8] += itinerary2[0].fare.regular.totalFare;
        method3[9] += itinerary2[0].totalTime;
        method3[i + 1] = itinerary2[0];
      }
    }

    itinerary2.sort(function (a: any, b: any) {
      if (a.transferCount == b.transferCount) return a.totalTime - b.totalTime;
      return a.transferCount - b.transferCount;
    });
    method4[i + 1] = itinerary2[0]; //transfer_1
    method4[6] += itinerary2[0].totalWalkTime;
    method4[7] += itinerary2[0].transferCount;
    method4[8] += itinerary2[0].fare.regular.totalFare;
    method4[9] += itinerary2[0].totalTime;

    itinerary.sort(function (a: any, b: any) {
      if (a.fare.regular.totalFare == b.fare.regular.totalFare)
        return a.totalTime - b.totalTime;
      return a.fare.regular.totalFare - b.fare.regular.totalFare;
    });
    method5[i + 1] = itinerary2[0]; //fare_1
    method5[6] += itinerary2[0].totalWalkTime;
    method5[7] += itinerary2[0].transferCount;
    method5[8] += itinerary2[0].fare.regular.totalFare;
    method5[9] += itinerary2[0].totalTime;

    method1[7] += 1;
    method2[7] += 1;
    method3[7] += 1;
    method4[7] += 1;
    method5[7] += 1;
  }

  let today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();

  var method1_hours = parseInt(method1[9] / 3600);
  method1[9] -= method1_hours * 3600;
  var method1_minutes = parseInt(method1[9] / 60);
  var method2_hours = parseInt(method2[9] / 3600);
  method2[9] -= method2_hours * 3600;
  var method2_minutes = parseInt(method2[9] / 60);
  var method3_hours = parseInt(method3[9] / 3600);
  method3[9] -= method3_hours * 3600;
  var method3_minutes = parseInt(method3[9] / 60);
  var method4_hours = parseInt(method4[9] / 3600);
  method4[9] -= method4_hours * 3600;
  var method4_minutes = parseInt(method4[9] / 60);
  var method5_hours = parseInt(method5[9] / 3600);
  method5[9] -= method5_hours * 3600;
  var method5_minutes = parseInt(method5[9] / 60);

  function print_time(
    hour: number,
    minute: number,
    mhour: number,
    mminute: number
  ) {
    if (minute + mminute > 59) hour += 1;
    hour += mhour;
    if (minute + mminute > 59) minute += mminute - 60;
    else minute += mminute;
    return hour.toString() + ":" + String(minute).padStart(2, "0");
  }

  return (
    <Center w="100vw" h="100vh" p="20">
      <SimpleGrid w="100vw" alignContent="center" spacing={4} columns={5}>
        <Card shadow="lg">
          <CardHeader>
            <Heading size="md"> 최소시간 경로1</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md">
              {" "}
              {method1_hours}시간 {method1_minutes}분
            </Heading>
            <Text>
              {hours}:{String(minutes).padStart(2, "0")} ~{" "}
              {print_time(hours, minutes, method1_hours, method1_minutes)}
            </Text>
            <Text>도보: {parseInt(method1[6] / 60)}분 </Text>
            <Text>환승: {method1[7]}회</Text>
            <Text>카드: {method1[8]}원</Text>
          </CardBody>
          <CardFooter>
            <Button
              variant="ghost"
              colorScheme="black"
              onClick={() => {
                localStorage.setItem(
                  "selectedRoute",
                  JSON.stringify(sendMethod(query, method1, query.length))
                );
                router.push({ pathname: "/verbose" });
              }}
            >
              경로 상세보기
            </Button>
          </CardFooter>
        </Card>
        <Card shadow="lg">
          <CardHeader>
            <Heading size="md"> 최소시간 경로2</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md">
              {" "}
              {method2_hours}시간 {method2_minutes}분
            </Heading>
            <Text>
              {hours}:{String(minutes).padStart(2, "0")} ~{" "}
              {print_time(hours, minutes, method2_hours, method2_minutes)}
            </Text>
            <Text>도보: {parseInt(method2[6] / 60)}분 </Text>
            <Text>환승: {method2[7]}회</Text>
            <Text>카드: {method2[8]}원</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              onClick={() => {
                localStorage.setItem(
                  "selectedRoute",
                  JSON.stringify(sendMethod(query, method2, query.length))
                );
                router.push({ pathname: "/verbose" });
              }}
            >
              <Button variant="ghost" colorScheme="black">
                경로 상세보기
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card shadow="lg">
          <CardHeader>
            <Heading size="md"> 최소시간 경로3</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md">
              {" "}
              {method3_hours}시간 {method3_minutes}분
            </Heading>
            <Text>
              {hours}:{String(minutes).padStart(2, "0")} ~{" "}
              {print_time(hours, minutes, method3_hours, method3_minutes)}
            </Text>
            <Text>도보: {parseInt(method3[6] / 60)}분 </Text>
            <Text>환승: {method3[7]}회</Text>
            <Text>카드: {method3[8]}원</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              onClick={() => {
                localStorage.setItem(
                  "selectedRoute",
                  JSON.stringify(sendMethod(query, method3, query.length))
                );
                router.push({ pathname: "/verbose" });
              }}
            >
              <Button variant="ghost" colorScheme="black">
                경로 상세보기
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card shadow="lg">
          <CardHeader>
            <Heading size="md"> 최소환승 경로</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md">
              {" "}
              {method4_hours}시간 {method4_minutes}분
            </Heading>
            <Text>
              {hours}:{String(minutes).padStart(2, "0")} ~{" "}
              {print_time(hours, minutes, method4_hours, method4_minutes)}
            </Text>
            <Text>도보: {parseInt(method4[6] / 60)}분 </Text>
            <Text>환승: {method4[7]}회</Text>
            <Text>카드: {method4[8]}원</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              onClick={() => {
                localStorage.setItem(
                  "selectedRoute",
                  JSON.stringify(sendMethod(query, method4, query.length))
                );
                router.push({ pathname: "/verbose" });
              }}
            >
              <Button variant="ghost" colorScheme="black">
                경로 상세보기
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card shadow="lg">
          <CardHeader>
            <Heading size="md"> 최소요금 경로</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md">
              {" "}
              {method5_hours}시간 {method5_minutes}분
            </Heading>
            <Text>
              {hours}:{String(minutes).padStart(2, "0")} ~{" "}
              {print_time(hours, minutes, method5_hours, method5_minutes)}
            </Text>
            <Text>도보: {parseInt(method5[6] / 60)}분 </Text>
            <Text>환승: {method5[7]}회</Text>
            <Text>카드: {method5[8]}원</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              onClick={() => {
                localStorage.setItem(
                  "selectedRoute",
                  JSON.stringify(sendMethod(query, method5, query.length))
                );
                router.push({ pathname: "/verbose" });
              }}
            >
              <Button variant="ghost" colorScheme="black">
                경로 상세보기
              </Button>
            </ButtonGroup>
            a
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Center>
  );
}

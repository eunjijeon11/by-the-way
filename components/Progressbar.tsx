import {
  Stack,
  Box,
  Circle,
  Flex,
  Card,
  Text,
  CardHeader,
  Heading,
  CardBody,
  Center,
} from "@chakra-ui/react";

function verboseBox(leg: any) {
  var icon: "🚍" | "🚊" | "🚶🏻" = "🚶🏻";
  var color: string = "gray.200";
  var verbose: string = "";
  if (leg.mode === "WALK") {
    icon = "🚶🏻";
    color = "gray.200";
    verbose = "도보로 " + leg.distance + "m 이동";
  } else if (leg.mode === "BUS") {
    icon = "🚍";
    color = "#" + leg.routeColor;
    verbose = leg.route + "로 " + leg.type + "개 정류장 이동";
  } else if (leg.mode === "SUBWAY") {
    icon = "🚊";
    color = "orange.300";
    verbose = "지하철";
  }

  return (
    <>
      <Flex width="100%" height="150px" flexDirection="row">
        <Flex width="40px" height="100%" flexDirection="column">
          <Circle size="40px" bg={color}>
            <Text fontSize="xl">{icon}</Text>
          </Circle>
          <Center
            width="10px"
            flex="1"
            bg={color}
            alignSelf="center"
            marginTop="-2"
            marginBottom="-4"
          >
            <Center m="-5" bg={color} p="1" borderRadius="lg">
              {(leg.sectionTime / 60).toFixed() + "분"}
            </Center>
          </Center>
        </Flex>
        <Card flex="1" marginLeft="4" shadow="lg">
          <CardHeader>
            <Heading size="sm">{leg.start.name + "에서"}</Heading>
          </CardHeader>
          <CardBody>{verbose}</CardBody>
        </Card>
      </Flex>
    </>
  );
}

export default function Progressbar(
  list: any[] // itineraries
) {
  var progressList: any[] = [];
  for (var i = 0; i < list[0].legs.length; i++) {
    progressList.push(verboseBox(list[0].legs[i]));
  }

  return (
    <>
      <Stack direction="column" height="-webkit-fit-content">
        {progressList}
      </Stack>
    </>
  );
}

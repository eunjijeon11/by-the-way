import styles from "@/styles/Home.module.css";
import { Button } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";

export default function Home() {
  const router: NextRouter = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/suggest")}>경로 검색하기</Button>
    </>
  );
}

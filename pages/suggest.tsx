import "../styles/suggest.module.css";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export default function Suggestion() {
  const router = useRouter();

  // 뭔가(ex: 버튼)를 눌렀을 때 라우터 실행
  // query에 데이터를 담아서 보낸다. 어떤 데이터를 담을지는 추후논의
  // router.push({pathname:"/verbose", query}); 이렇게 하면됨
  // 페이지 실험을 위해 예시버튼 넣어놓겠음!

  const query = {};

  return (
    <>
      <Button onClick={() => router.push({ pathname: "/verbose", query })}>
        자세히보기
      </Button>
    </>
  );
}

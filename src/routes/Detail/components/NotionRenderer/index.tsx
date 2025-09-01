import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  .notion-list {
    width: 100%;
  }
  /* 노션 Divider(---) 스타일 */
  .notion-hr {
    border: none;
    border-top: 1.5px solid #e0e0e0;
    margin: 1rem 0;
    width: 100%;
  }
  
  /* 본문 끝 여백 제거 */
  .notion-page-content {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }
  
  /* 노션 페이지 하단 여백 제거 */
  .notion-page-content > div:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  
  /* 노션 블록 하단 여백 최소화 */
  .notion-block {
    margin-bottom: 0.5rem !important;
  }
  
  /* 노션 블록 마지막 요소 여백 제거 */
  .notion-block:last-child {
    margin-bottom: 0 !important;
  }
  
  /* 노션 텍스트 블록 여백 조정 */
  .notion-text-block {
    margin-bottom: 0.25rem !important;
  }
  
  /* 노션 텍스트 블록 마지막 요소 여백 제거 */
  .notion-text-block:last-child {
    margin-bottom: 0 !important;
  }
  
  /* 코드 블록 전체 내용 표시 */
  .notion-code-block {
    max-height: none !important;
    height: auto !important;
    overflow: visible !important;
  }
  
  /* 코드 블록 내부 스크롤 제거 */
  .notion-code-block > div {
    max-height: none !important;
    height: auto !important;
    overflow: visible !important;
  }
  
  /* 코드 블록 pre 태그 스크롤 제거 */
  .notion-code-block pre {
    max-height: none !important;
    height: auto !important;
    overflow: visible !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }
  
  /* 코드 블록 내부 코드 텍스트 */
  .notion-code-block code {
    max-height: none !important;
    height: auto !important;
    overflow: visible !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }
  
  /* 본문 끝 여백만 제거 - 스크롤을 투명 카드 하단에서 끝나게 */
  .notion-page-content {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }
  
  /* 노션 페이지 하단 여백 제거 */
  .notion-page {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }
  
  /* 노션 콘텐츠의 마지막 요소 여백 제거 */
  .notion-page-content > *:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  
  /* 본문 끝 여백 완전 제거 - 카드 끝에서 스크롤 끝나게 */
  .notion-page-content {
    margin-bottom: 0 !important;
  }
  
  /* 노션 페이지 하단 여백 제거 */
  .notion-page {
    margin-bottom: 0 !important;
  }
  
  /* 모든 노션 블록의 하단 여백 최소화 */
  .notion-block,
  .notion-text-block,
  .notion-code-block,
  .notion-image-block,
  .notion-divider-block,
  .notion-quote-block,
  .notion-callout-block,
  .notion-toggle-block,
  .notion-bulleted-list-block,
  .notion-numbered-list-block,
  .notion-to-do-block,
  .notion-table-block,
  .notion-column-block,
  .notion-column-list-block {
    margin-bottom: 0.5rem !important;
  }
  
  /* 마지막 블록의 하단 여백 완전 제거 */
  .notion-page-content > *:last-child,
  .notion-page-content > *:last-child > *:last-child {
    margin-bottom: 0 !important;
  }
  
  /* 본문 끝 여백 완전 제거 - 모든 하위 요소 포함 */
  .notion-page-content *:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  
  /* 노션 페이지 내부의 모든 마지막 요소 여백 제거 */
  .notion-page *:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  
  /* 본문 컨테이너 자체의 여백 제거 */
  .notion-page-content,
  .notion-page {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
`;

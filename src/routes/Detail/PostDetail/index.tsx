import React, { useEffect, useState } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

interface TOCItem {
  id: string
  text: string
  level: number
}

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Notion 렌더링 후 헤딩 요소들을 찾아서 TOC 아이템 생성
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('h2, h3, h4, h5, h6') // h1 제외
      const items: TOCItem[] = []

      headings.forEach((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
        if (!id) return

        // ID가 없으면 생성
        if (!heading.id) {
          heading.id = id
        }

        items.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      })

      setTocItems(items)

      // Intersection Observer로 현재 보이는 헤딩 감지
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        {
          rootMargin: '-80px 0px -80% 0px' // 앱바 바로 아래에 위치했을 때 하이라이팅
        }
      )

      headings.forEach((heading) => observer.observe(heading))

      return () => observer.disconnect()
    }, 1000) // Notion 렌더링 대기

    return () => clearTimeout(timer)
  }, [data])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementTop = element.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetPosition = scrollTop + elementTop - 80 // 앱바 높이 + 여유 공간
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <MainContent>
        <article>
          {category && (
            <div css={{ marginBottom: "0.5rem" }}>
              <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
                {category}
              </Category>
            </div>
          )}
          {data.type[0] === "Post" && <PostHeader data={data} />}
          <div>
            <NotionRenderer recordMap={data.recordMap} />
          </div>
          {data.type[0] === "Post" && (
            <>
              <Footer />
              <CommentBox data={data} />
            </>
          )}
        </article>
      </MainContent>
      
      {tocItems.length > 0 && (
        <TOCSidebar>
          <TOCList>
            {tocItems.map((item) => (
              <TOCItem
                key={item.id}
                level={item.level}
                isActive={activeId === item.id}
                onClick={() => scrollToHeading(item.id)}
              >
                {item.text}
              </TOCItem>
            ))}
          </TOCList>
        </TOCSidebar>
      )}
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
`

const MainContent = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.gray2};
  box-shadow: none;
  
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`

const TOCSidebar = styled.nav`
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: 280px;
  height: fit-content;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const TOCItem = styled.li<{ level: number; isActive: boolean }>`
  margin: 0.25rem 0;
  padding: 0.25rem 0;
  padding-left: ${({ level }) => (level - 1) * 1}rem;
  font-size: 0.9rem;
  line-height: 1.4;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue11 : theme.colors.gray11};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};

  &:hover {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.blue9 : theme.colors.gray8};
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`

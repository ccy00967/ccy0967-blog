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
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
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
          rootMargin: '-20% 0px -35% 0px'
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
      element.scrollIntoView({ behavior: 'smooth' })
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
          <TOCTitle>목차</TOCTitle>
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
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const MainContent = styled.div`
  flex: 1;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  > article {
    margin: 0 auto;
    max-width: 42rem;
    padding: 0 1.5rem;
  }
`

const TOCSidebar = styled.nav`
  position: sticky;
  top: 2rem;
  width: 280px;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) =>
    theme.scheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const TOCTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
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
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue3 : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.colors.blue11};
    background-color: ${({ theme }) => theme.colors.blue2};
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

import React, { useEffect, useRef } from "react"
import { CONFIG } from "site.config"
import useScheme from "src/hooks/useScheme"
import styled from "@emotion/styled"

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scheme] = useScheme()

  useEffect(() => {
    if (!ref.current) return

    const theme = `github-${scheme}`
    const script = document.createElement("script")

    const config: Record<string, string> = {
      src: "https://utteranc.es/client.js",
      repo: CONFIG.utterances.config.repo,
      "issue-term": issueTerm,
      label: "💬 Utterances",
      theme,
      crossorigin: "anonymous",
      async: "true",
    }

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    ref.current.appendChild(script)

    // Clean up
    return () => {
      if (ref.current) {
        ref.current.innerHTML = ""
      }
    }
  }, [scheme, issueTerm]) // Rerun effect when theme or post changes

  return <StyledWrapper ref={ref} />
}

export default Utterances

const StyledWrapper = styled.div`
  width: 100%;
  .utterances {
    max-width: 100% !important;
  }
`
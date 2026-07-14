import { useState, useCallback } from 'react'
import { useSessionStore } from '@/store/sessionStore'

export function useChat() {
  const activeSession = useSessionStore((s) => {
    const session = s.sessions.find((ss) => ss.id === s.activeSessionId)
    return session ?? null
  })
  const addMessage = useSessionStore((s) => s.addMessage)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const messages = activeSession?.messages ?? []

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true)
      setError(null)

      try {
        addMessage(content)

        await new Promise((resolve) => setTimeout(resolve, 1500))

        addMessage(
          `同学，请先查阅左侧 **Russenes 判据**，代入你的参数计算 $I_b$ 值：

$$I_b = \\frac{\\sigma_\\theta}{\\sigma_c} \\times \\kappa_s$$

当 $I_b > 0.45$ 时为**强烈岩爆区**。

| 岩爆等级 | $I_b$ 范围 | 破坏特征 |
|:---:|:---:|------|
| A | $< 0.2$ | 轻微破坏 |
| B | $0.2 - 0.45$ | 中等破坏 |
| C | $0.45 - 0.8$ | 强烈破坏 |
| D | $> 0.8$ | 极强烈破坏 |

请根据右侧参数面板中的 $\\sigma_\\theta$ 和 $\\sigma_c$ 值，算完告诉我你的结果。`,
          'assistant',
        )
      } catch (e) {
        setError(e instanceof Error ? e.message : '发送失败')
      } finally {
        setIsLoading(false)
      }
    },
    [addMessage],
  )

  return { messages, sendMessage, isLoading, error }
}

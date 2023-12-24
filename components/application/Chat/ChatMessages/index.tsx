"use client"
import { ElementRef, Fragment, useRef } from "react"
import { Member, Message, Profile } from "@prisma/client"
import { format } from "date-fns"
import { useChatQuery } from "@/hooks/use-chat-query"
import { Loader2, Loader2Icon, ServerCrashIcon } from "lucide-react"
import ChatWelcome from "@/components/application/Chat/ChatWelcome"
import ChatItem from "@/components/application/Chat/ChatItem"
import { useChatSocket } from "@/hooks/use-chat-socket"
import { useChatScroll } from "@/hooks/use-chat-scroll"

const DATE_FORMAT = "d MMM yyyy HH:mm"

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string
    member: Member
    chatId: string
    apiUrl: string
    socketUrl: string
    socketQuery: Record<string, string>
    paramKey: "channelId" | "conversationId"
    paramValue: string
    type: "channel" | "conversation"
}

const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    paramKey,
    paramValue,
    socketQuery,
    socketUrl,
    type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`
    const chatRef = useRef<ElementRef<"div">>(null)
    const bottomRef = useRef<ElementRef<"div">>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    useChatSocket({ queryKey, addKey, updateKey })
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
      })

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="my-4 w-7 h-7 text-zinc-500 animate-spin" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Carregando mensagens...
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrashIcon className="my-4 w-7 h-7 text-zinc-500" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Algo deu errado!
                </p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className="py-4 flex flex-col flex-1 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (
                <ChatWelcome
                    type={type}
                    name={name}
                />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2Icon className="my-4 w-6 h-6 text-zinc-500 animate-spin" />
                    ) : (
                        <button
                            className="my-4 text-xs text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                            onClick={() => fetchNextPage()}
                        >
                            Carregar mensagens anteriores
                        </button>
                    )}
                </div>
            )}
            <div className="mt-auto flex flex-col-reverse">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}
 
export default ChatMessages
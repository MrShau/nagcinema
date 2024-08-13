export default function ChatMessageItem({content, date, sender}: {content: string, date: string, sender: string}) {
    return(
        <div className={`my-2 px-2`}>
            <div><span className="text-secondary">{sender}: </span>{content}</div>
            <div className="small text-secondary mt-1">
                <div>
                    {date}
                </div>
                
            </div>
        </div>
    )
}
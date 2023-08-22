export default function MultilineSpan({children} : {children: string[]}) {
    return (
        <>
            {children?.map((v, i) => {
                return <span key={i} className="block">{v}</span>
            })}
        </>
    )
}
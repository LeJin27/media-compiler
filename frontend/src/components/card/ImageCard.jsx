
export default function ImageCard ({children, imgSrc, ...props}) {
    return (
        <div {...props} className="relative max-w-xs overflow-hidden rounded-2xl  group">
            <img alt = " "  src = {imgSrc} className="transition-transform group-hover:scale-110 duration-200"/>
            <div className="absolute inset-0 flex items-end  justify-center bg-gradient-to-t from-[#000000]/60 to-transparent p-3">
                <div>
                    <div className="text-white font-bold">{children}</div>
                </div>
            </div>
        
        
        </div>

    )

}
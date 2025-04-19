import {Accordion, AccordionItem} from "@heroui/react";
import Link from "next/link";

export default function App({filmData}) {
    return (
        <>
            {filmData.watchability.items.length > 0 && (
                <Accordion className="p-0">
                    <AccordionItem className="flex flex-col p-0" aria-label="Где посмотреть?" title="Где смотреть?">
                        <div className="flex flex-col gap-3">
                            {filmData.watchability?.items.map((data, index) => (
                                <div key={index}>
                                    <Link className="flex items-center gap-2" href={data.url}>
                                        <img className="w-8 h-8 rounded-full" src={data.logo.url}></img>
                                        <span
                                            className="hover:text-orange-600 transition duration-200 ease-in-out">{data.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                </Accordion>
            )}
        </>
    )
}
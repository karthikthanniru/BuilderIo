import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import FourOhFour from "./FourOhFour";

builder.init("0d87f6b482864064acd3ced3415d3ef8");

export default function CatchAllRoute() {
    const isPreviewingInBuilder = useIsPreviewing();
    const [notFound, setNotFound] = useState(false);
    const [content, setContent] = useState(null);


    useEffect(() => {
        async function fetchContent() {
            const content = await builder
                .get("page", {
                    url: window.location.pathname
                })
                .promise();

            setContent(content);
            setNotFound(!content);


            if (content?.data.title) {
                document.title = content.data.title
            }
        }
        fetchContent();
    }, [window.location.pathname]);


    if (notFound && !isPreviewingInBuilder) {
        return <FourOhFour />
    }

    return (
        <>
            <BuilderComponent model="page" content={content} />
        </>
    );
}
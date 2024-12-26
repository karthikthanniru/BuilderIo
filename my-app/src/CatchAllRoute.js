import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import FourOhFour from "./FourOhFour";
import Header from "./Components/Header/Header";

builder.init(process.env.REACT_APP_API_URL);

export default function CatchAllRoute() {
    const isPreviewingInBuilder = useIsPreviewing();
    const [notFound, setNotFound] = useState(false);
    const [content, setContent] = useState(null);
    console.log(content)

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
            <Header />
            <BuilderComponent model="page" content={content} />
        </>
    );
}
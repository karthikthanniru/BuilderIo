import { useEffect, useState } from "react";
import { Builder, BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import FourOhFour from "./FourOhFour";
import Header from "./Components/Header/Header";
import ImageWithText from "./Components/BuilderComponents/ImageWithText";

builder.init(process.env.REACT_APP_API_URL);

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
            <Header />
            <BuilderComponent model="page" content={content} />
        </>
    );
}

// Register the component
Builder.registerComponent(ImageWithText, {
    name: 'ImageWithText',
    inputs: [
        {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['jpeg', 'png', 'svg', 'gif'],
            required: true,
            friendlyName: 'Image',
            helperText: 'Upload an image to display.',
        },
        {
            name: 'title',
            type: 'string',
            required: true,
            friendlyName: 'Title',
            helperText: 'Enter the title for the component.',
        },
        {
            name: 'description',
            type: 'string',
            required: false,
            friendlyName: 'Description',
            helperText: 'Enter a description for the component.',
        },
        {
            name: 'layout',
            type: 'string',
            required: true,
            friendlyName: 'Layout',
            helperText: 'Select the layout for the image and text.',
            enum: [
                { label: 'Image on Left, Text on Right', value: 'image-left-text-right' },
                { label: 'Image on Right, Text on Left', value: 'image-right-text-left' },
                { label: 'Image on Top, Text Below', value: 'image-top-text-below' },
            ],
            defaultValue: 'image-left-text-right',
        },
    ],
});

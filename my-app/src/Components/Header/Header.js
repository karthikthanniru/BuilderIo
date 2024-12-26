import { builder } from "@builder.io/react";
import { useEffect, useState } from "react";
import "./Header.css"; // Import the CSS file

const Header = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settings = await builder.getAll("settings", {});
                setLinks(settings[0]?.data?.navBar?.labels || []);
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">My Website</h1>
                <nav className="nav">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={`#${link.text.toLowerCase()}`}
                            className="nav-link"
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;

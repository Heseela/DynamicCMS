import React from "react";
import JoditEditor from "jodit-react";
import { FormControl, FormItem } from "../ui/form";

interface JoditEditorProps {
    value: string;
    onChange: (val: string) => void;
}

const JoditEditorComponent: React.FC<JoditEditorProps> = ({
onChange, value
}) => {
    // const joditConfig = {
    //     readonly: false,
    //     height: 300,
    //     toolbar: true,
    //     width: "auto%",
    //     iframe: false,
    //     style: {
    //       width: "auto%",
    //       maxWidth: "100%",
    //       overflowX: "hidden"
    //     },
    //   };

    const joditConfig = {
        readonly: false,
        height: 300,
        addNewLine: false,
        toolbar: true,
        allowResizeX: false,
        allowResizeY: false,

    };

    const cleanContent = (content: string) => {
        console.log("🚀 ~ cleanContent ~ content:", content)
        // If the content is just "<p><br></p>", treat it as empty
        if (content.trim() === "<p><br></p>" || content.trim() === "") {
            return "";
        }
        return content.trim();
    };

    return (
        <FormItem>
            <FormControl>
                <JoditEditor

                    value={value || ""}
                    // onBlur={(content: string) => onChange(content)}
                    onBlur={(content: string) => onChange(cleanContent(content))}
                    className="prose focus-visible:ring-primaryColor focus-visible:ring-1"
                    config={joditConfig}
                />
            </FormControl>
        </FormItem>
    );
};

export default JoditEditorComponent;

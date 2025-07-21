
// import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import { EBlock, ECardsBlockLayout } from "../../Types/blocks.types"
import { EAlignment, EOrder, ERefRelation } from "../../Types/global.types"
import type { TBlock } from "../../Models/page.model"


export const blockLayouts: {
    block: TBlock,
    // image: string,
    alt: string
}[] = [
        {
            block: {
                type: EBlock.Text,
                headline: "",
                subheadline: "",
                body: "",
                cta: [],
                align: EAlignment.Left,
            },
            alt: "Text",
            // image: jumboCenter
        },
        {
            block: {
                type: EBlock.Image,
                images: []
            },
            alt: "Images",
            // image: jumboCenter
        },
        {
            block: {
                type: EBlock.Cards,
                layout: ECardsBlockLayout.Grid,
                cards: [],
                maxColumns: 3,
                borderLess: false,
                newTab: false
            },
            alt: "Cards",
            // image: jumboCenter,
        },
        {
            block: {
                type: EBlock.RefItem,
                ref: ERefRelation.Course,
                limit: 3,
                order: EOrder.Desc,
                selected: undefined
            },
            alt: "RefItem",
            // image: jumboCenter
        },
        {
            block: {
                type: EBlock.Form,
                form: {
                    id: "",
                    title: ""
                }
            },
            alt: "Form",
            // image: jumboCenter
        }
    ]
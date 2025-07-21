import type { THeroSectionDto } from "../../Models/hero.model"
import { EHeroLayoutTypes } from "../../Types/page.types"
import { EAlignment, EAlignmentExcludeCenter } from "../../Types/global.types"

export const heroLayouts: {
    layout: THeroSectionDto["layout"],
    alt: string,
    description: string
}[] = [
    {
        layout: {
            type: EHeroLayoutTypes.Jumbotron,
            alignment: EAlignment.Left,
        },
        alt: "Jumbotron Left",
        description: "Text on right, image on left"
    },
    {
        layout: {
            type: EHeroLayoutTypes.Jumbotron,
            alignment: EAlignment.Center,
        },
        alt: "Jumbotron Center",
        description: "Centered content with image"
    },
    {
        layout: {
            type: EHeroLayoutTypes.Jumbotron,
            alignment: EAlignment.Right,
        },
        alt: "Jumbotron Right",
        description: "Text on left, image on right"
    },
    {
        layout: {
            type: EHeroLayoutTypes.Split_Hero,
            imagePosition: EAlignmentExcludeCenter.Left,
        },
        alt: "Split Hero Left",
        description: "50/50 split with image on left"
    },
    {
        layout: {
            type: EHeroLayoutTypes.Split_Hero,
            imagePosition: EAlignmentExcludeCenter.Right,
        },
        alt: "Split Hero Right",
        description: "50/50 split with image on right"
    },
]
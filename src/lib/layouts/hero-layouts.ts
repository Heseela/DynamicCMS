import jumboLeft from "@/assets/layouts/hero-layout/jumbotron-left.svg"
import jumboRight from "@/assets/layouts/hero-layout/jumbotron-right.svg"
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import splitHeroImgLeft from "@/assets/layouts/hero-layout/split-hero-img-left.svg"
import splitHeroImgRight from "@/assets/layouts/hero-layout/split-hero-img-right.svg"
import type { THeroSectionDto } from "../../Models/hero.model"
import { EHeroLayoutTypes } from "../../Types/page.types"
import { EAlignment, EAlignmentExcludeCenter } from "../../Types/global.types"

export const heroLayouts: {
    layout: THeroSectionDto["layout"],
    image: string,
    alt: string
}[] = [
        {
            layout: {
                type: EHeroLayoutTypes.Jumbotron,
                alignment: EAlignment.Left,
            },
            image: jumboLeft,
            alt: "Jumbotron Left"
        },
        {
            layout: {
                type: EHeroLayoutTypes.Jumbotron,
                alignment: EAlignment.Center,
            },
            image: jumboCenter,
            alt: "Jumbotron Center"
        },
        {
            layout: {
                type: EHeroLayoutTypes.Jumbotron,
                alignment: EAlignment.Right,
            },
            image: jumboRight,
            alt: "Jumbotron Right"
        },
        {
            layout: {
                type: EHeroLayoutTypes.Split_Hero,
                imagePosition: EAlignmentExcludeCenter.Left,
            },
            image: splitHeroImgLeft,
            alt: "Split Hero Left"
        },
        {
            layout: {
                type: EHeroLayoutTypes.Split_Hero,
                imagePosition: EAlignmentExcludeCenter.Right,
            },
            image: splitHeroImgRight,
            alt: "Split Hero Right"
        },
    ]
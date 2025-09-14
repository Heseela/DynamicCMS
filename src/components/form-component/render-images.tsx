import type { TMediaSchema } from '../../Models/media.model'

type Props = {
    media: TMediaSchema[] | TMediaSchema | undefined | null,
    onRemove: (id: string) => void;
}

export default function RenderImages({ media, onRemove }: Props) {
    return (
        <section>
            {
                Array.isArray(media)
                    ? media.length > 0
                        ? (
                            media?.map(image => (
                                <div>
                                    {image.originalName}
                                </div>
                            ))
                        )
                        : null
                    : media && (
                        <div>
                            <ImageComponent media={media} onRemove={onRemove} />
                        </div>
                    )

            }
        </section>
    )
}

function ImageComponent ({media, onRemove}: {media: TMediaSchema, onRemove: Props['onRemove']}) {
    return (
        <img src={media.url} />

    )
}
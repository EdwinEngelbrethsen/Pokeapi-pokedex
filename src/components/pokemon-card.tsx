import { AspectRatio, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'

export function PokemonCard(props: { name: string; id: number; sprite: string }) {
    return (
        <Card
            className="hover:bg-slate-100 m-4 p-4 rounded-lg shadow-md w-64"
            sx={{ width: 320 }}
        >
            <AspectRatio objectFit="contain">
                <img
                    className=""
                    src={props.sprite}
                    alt={props.name}
                />
            </AspectRatio>
            <Typography>
                #{props.id}{' '}
                {props.name.charCodeAt(0) > 90
                    ? props.name.charAt(0).toUpperCase() + props.name.slice(1)
                    : props.name}
            </Typography>
        </Card>
    )
}
export default PokemonCard

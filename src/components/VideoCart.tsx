import React from 'react'
import Since from './Since'
import { Link } from 'react-router-dom'
import { gaEvents } from '../common_function'
import { reactionImage, defaultVideoImage } from '../constants'
import Avatar from './Avatar'

export type videoCartProps = {
    id: number;
    streamer: {
        id: number;
        name: string;
        slug: string;
    },
    player: {
        id: number | string;
        name: string;
        slug: string;
    },
    streamStart: number;
    action: string;
    videoId?: number;
    timestamp: number | '';
    avatar: boolean | string;
    includeStreamerName: boolean;
    match_on_player_id: boolean;
    title?: string;
    imageId: number;
    since: any;
    gaEvent?: string;
    c_title?: string;
}
const VideoCart = (props: videoCartProps) => {
    let { id, streamer, match_on_player_id, player, since, videoId, title, c_title, imageId = '', timestamp = '', avatar = false, includeStreamerName = false, gaEvent } = props
    videoId = videoId || id
    function error(event: any) {
        event.target.src = defaultVideoImage
    }
    let killMsg = match_on_player_id ? `eliminated` : `eliminated by`
    const videoUrl = `/video/${videoId}/${timestamp ? `timer/${timestamp}/` : ''}`
    const playerUrl = `/player/${(player || {}).id}/${(player || {}).slug}`
    return (
        <div className="video_cart">
            <div className="video_cart__streamername">
                {includeStreamerName ? `${streamer.name}` : null}
            </div>
            <Link to={videoUrl} className="video_cart--link" onClick={() => gaEvents({ eventCategory: `${gaEvent}`, eventAction: 'click', eventLabel: `${videoId}` })}>
                <img className="video_cart--image"
                    onError={error}
                    src={reactionImage.replace('::id', `${imageId ? imageId : id}`)}
                    alt={title === void 0 ? `${player.name}` : title}
                />
                <Since since={since} />
            </Link>
            <div className="video_cart__info">
                {avatar ?
                    <Link to={`/player/${streamer.id}/${streamer.slug}`} className="video_cart__info__streamer--pic" onClick={() => gaEvents({ eventCategory: `${gaEvent}:avatar`, eventAction: 'click', eventLabel: `${videoId}` })}>
                        <Avatar player={streamer} />
                    </Link>
                    :
                    ''
                }
                {includeStreamerName ?
                    <span className={`video_cart__info__description${title != null ? ' title' : ''}`}>
                        {title === void 0 ? <Link to={playerUrl}>{player.name}</Link> : title}
                    </span>
                    :
                    <span className={`video_cart__info__name${title != null ? ' title' : ''}${avatar ? ' avatar' : ''}`}>
                        {avatar && c_title ?
                            <>
                                <span className={`video_cart__info__name__streamer`}>{streamer.name}</span>
                                <Link className={`video_cart__info__name__title`} to={videoUrl} onClick={() => gaEvents({ eventCategory: `${gaEvent}`, eventAction: 'click', eventLabel: `${videoId}` })}>{c_title}</Link>
                            </> :
                            avatar ?
                                <span className={`video_cart__info__name__streamer`}>{streamer.name}</span> :
                                title === void 0 && player.name !== 'victory' ?
                                    <Link to={playerUrl} onClick={() => gaEvents({ eventCategory: `${gaEvent}:player_url`, eventAction: 'click', eventLabel: `${videoId}` })}>{`${killMsg}`}<br />{`${player.name}`}</Link> :
                                    (title ? title : 'Victory Royale')
                        }
                    </span>
                }
            </div>
        </div>
    )
}


export default VideoCart
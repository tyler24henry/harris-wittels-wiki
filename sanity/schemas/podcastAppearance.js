import { SiApplepodcasts as icon } from 'react-icons/si';

export default {
    name: 'podcastAppearance',
    title: 'Podcast Appearance',
    type: 'document',
    icon,
    fields: [
        {
            name: 'month',
            title: 'Month',
            type: 'string',
        },
        {
            name: 'day',
            title: 'Day',
            type: 'number',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'number',
        },
        {
            name: 'podcastTitle',
            title: 'Podcast title',
            type: 'string',
        },
        {
            name: 'episodeTitle',
            title: 'Episode title',
            type: 'string',
        },
        {
            name: 'host',
            title: 'Host',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
    ],
    preview: {
        select: {
            podcastTitle: 'podcastTitle',
            episodeTitle: 'episodeTitle',
        },
        prepare: ({ podcastTitle, episodeTitle }) => {
            return {
                title: podcastTitle,
                subtitle: episodeTitle,
            }
        }
    }
}
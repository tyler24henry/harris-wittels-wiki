import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight } from 'react-icons/fi';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';
import { Link } from 'gatsby';
import { VscCalendar } from 'react-icons/vsc';
import { AiOutlineComment } from 'react-icons/ai';
import { sortByDate } from '../utils/dateHelpers';
import { CommentCount } from 'disqus-react';

export const FanPostsStyles = styled.div`
    .posts {
        font-size: 1.5rem;
        color: var(--black);
        font-weight: 500;
        white-space: pre-wrap;
    }
    a {
        &:hover {
            text-decoration: none;
        }
    }
    .post {
        border-top: 1px solid #c4cfd7;
        padding: 1.2rem 1.5rem;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 1rem;
        align-items: center;
        transition: all 0.2s;
        @media (max-width: 414px) {
            padding: 1rem 1.25rem;
        }
        &:hover {
            background-color: #f7f7f7;
        }
        .title {
            font-size: 1.4rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            @media(max-width: 414px){
                font-size: 1.2rem;
            }
        }
        .details-wrapper {
            margin-top: 0.4rem;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 0.5rem;
            font-size: 1.2rem;
            align-items: center;
            @media(max-width: 414px){
                font-size: 1rem
            }
            .calendar {
                padding-bottom: 0.1rem;
            }
            .details {

            }
        }
        .comment-wrapper {
            justify-self: end;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 0.5rem;
            align-items: center;
            justify-content: end;
            justify-items: end;
            font-size: 1.3rem;
            font-weight: 500;
            @media(max-width: 414px){
                font-size: 1.1rem;
            }
        }
        .comment-icon {
            font-size: 1.6rem;
            @media(max-width: 414px){
                font-size: 1.3rem;
            }
        }
    }
    #first-post {
        border-top: none;
    }
`;

export const FanPosts = ({ siteImages, fanPosts }) => {
    const [fanPostsAvatar] = siteImages.filter(image => image.name === 'Fan Posts Avatar');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let fanPostsFiltered = sortByDate([...fanPosts]);

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        fanPostsFiltered = [...fanPostsFiltered].filter(post => {
            const match = regex.test(post.title.toLowerCase()) || regex.test(post.firstName.toLowerCase()) || regex.test(post.lastName.toLowerCase());
            return match;
        });
    }

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image" id="fan-posts-background"></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={fanPostsAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="fan posts" />
                        <button className="phrase-btn" id="sharin" type="button">Postin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h1>Fan Posts</h1>
                    </div>
                    <p id="description">Kind of like an r/HarrisWittels except not on Reddit. These are posts about Harris from visitors of the website.</p>
                    <p id="description">To share your favorite Harris story, joke, how Harris affected your life, or anything Harris related, go to the <Link to="/create-fan-post">create fan post page</Link>.</p>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header" id="fan-posts-nav-header">
                        <p>Posts</p>
                    </div>
                    <div id="link-wrapper">
                        <Link to="/tributes">Tributes</Link>
                        <FiChevronRight className="link-icon" />
                    </div>
                </div>
                <FanPostsStyles>
                    <div className="posts">
                        {fanPostsFiltered.map((fanPost, index) => {
                            const date = `${fanPost.month} ${fanPost.day}, ${fanPost.year}`;
                            let name = fanPost.firstName;
                            if(fanPost.lastName){
                                name = `${fanPost.firstName} ${fanPost.lastName}`;
                            }
                            const disqusConfig = {
                                url: `https://www.harriswittels.wiki/fan-post/${fanPost.slug.current}`,
                                identifier: fanPost.id,
                                title: fanPost.title,
                            }
                            return (
                                <Link to={`/fan-post/${fanPost.slug.current}`} className="post" id={index === 0 ? 'first-post' : ''} key={fanPost.id}>
                                    <div>
                                        <h3 className="title">{fanPost.title}</h3>
                                        <div className="details-wrapper">
                                            <VscCalendar className="calendar" />
                                            <p className="details">{date} by {name}</p>
                                        </div>
                                    </div>
                                    <div className="comment-wrapper">
                                        <AiOutlineComment className="comment-icon" />
                                        <CommentCount
                                            shortname="harris-wittels-wiki"
                                            config={disqusConfig}
                                        >
                                            <span>0 Comments</span>
                                        </CommentCount>
                                    </div>
                                </Link>
                            )
                        })}
                        {fanPostsFiltered.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No fan posts found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                            </div>
                        )}
                    </div>
                </FanPostsStyles>
            </div>
        </BodyStyles>
    )
}

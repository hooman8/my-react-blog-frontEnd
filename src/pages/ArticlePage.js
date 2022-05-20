import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticlesList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';
// Basic react component called homepage

const ArticlePage = ({match}) => {
  const name = match.params.name;
  const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    }
    fetchData();
  }, [name]);

  const article = articleContent.find(article => article.name === name);
  if(!article) return <NotFoundPage />
  const otherArticles = articleContent.filter(article => article.name !== name);
  return (
  <React.Fragment>
    <h1>{article.title}</h1>
    <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}  />
    {article.content.map((paragraph, key) => (
      <p key={key}>{paragraph}</p>
    ))}
    <CommentsList comments={articleInfo.comments} />
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    <h3>Other Articles</h3>
    <ArticlesList articles={otherArticles} />
  </React.Fragment>
 
)};

export default ArticlePage;
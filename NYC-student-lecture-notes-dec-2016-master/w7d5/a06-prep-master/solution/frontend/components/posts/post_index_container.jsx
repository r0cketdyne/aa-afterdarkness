import { connect } from 'react-redux';
import PostIndex from './post_index';
import { fetchPosts, deletePost, createPost } from '../../actions/post_actions';

const mapStateToProps = state => ({
  posts: Object.keys(state.posts).map(id => state.posts[id])
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: id => dispatch(deletePost(id)),
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);

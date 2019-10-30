import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, FilterBar, FilterButton, IssueList } from './styles';

export default class Repository extends Component {
  constructor() {
    super();

    this.state = {
      repoName: '',
      repo: {},
      issues: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repo);

    // api/github.com/repos/facebook/react/
    // api/github.com/repos/facebook/react/issues

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repoName,
      repo: repo.data,
      issues: issues.data,
      loading: false,
    });
  }

  // showOpenIssues = () => {};
  // showClosedIssues = () => {};

  render() {
    const { repo, issues, loading } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    const showAllIssues = async currentState => {
      const { repoName } = currentState;
      const response = await api.get(`/repos/${repoName}/issues?state=all`, {
        params: { per_page: 30 },
      });
      console.log(response);

      this.setState({ repoName, repo, issues: response.data, loading });
    };

    return (
      <Container>
        <Owner>
          <Link to="/">... go back to repos</Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </Owner>

        <FilterBar>
          <FilterButton onClick={this.showAllIssues}>All</FilterButton>
          {/* <FilterButton onClick={this.showOpenIssues}>Open</FilterButton> */}
          {/* <FilterButton onClick={this.showClosedIssues}>Closed</FilterButton> */}
        </FilterBar>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }).isRequired,
};

import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Input } from './styles';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      newRepo: '',
      repos: [],
      loading: false,
      loadingError: '',
    };
  }

  componentDidMount() {
    const repos = localStorage.getItem('repos');

    if (repos) {
      this.setState({ repos: JSON.parse(repos) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;

    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos, loadingError } = this.state;

    try {
      repos.forEach(repo => {
        if (repo.name === newRepo) {
          throw new Error('Repo already added to list');
        }
      });

      const response = await api.get(`/repos/${newRepo}`);

      if (loadingError) {
        this.setState({ loadingError: '' });
      }

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      console.log(err);
      
      this.setState({ loading: false, loadingError: err });
    }
  };

  render() {
    const { newRepo, loading, repos, loadingError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          GitHub Repos
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Add a repo"
            value={newRepo}
            onChange={this.handleInputChange}
            loadingError={loadingError}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

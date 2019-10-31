import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  margin-top: 15px;
`;

export const FilterButton = styled.button`
  background: #7159c1;
  border: 0;
  padding: 10px 10px;
  margin-right: 10px;
  border-radius: 4px;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IssueList = styled.ul`
  padding-top: 0px;
  margin-top: 15px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const PageBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export const PageButtonPrevious = styled.button.attrs(props => ({
  type: 'previousPage',
  disabled: props.disabled,
}))`
  background: #7159c1;
  border: 0;
  padding: 10px 10px;
  margin-right: 10px;
  border-radius: 4px;
  color: #fff;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    background: #eee;
  }
`;

export const PageButtonNext = styled.button`
  background: #7159c1;
  border: 0;
  padding: 10px 10px;
  margin-right: 10px;
  border-radius: 4px;
  color: #fff;
`;

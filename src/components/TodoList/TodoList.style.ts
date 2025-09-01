import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  hi {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  .sort__conteiner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    .sort__btn {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background-color: #f5f5f5;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      transition: all 0.2s;
      span {
        font-size: 18px;
      }
    }
  }
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    gap: 10px;
  }
  .emptyTodos {
    background-color: #f9f9f9;
    padding: 20px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    h2 {
      margin-bottom: 10px;
      font-size: 18px;
      color: #333;
    }
    p {
      color: #666;
    }
  }
  .todos__conteiner {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .errormessage {
    padding: 15px;
    margin-bottom: 20px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    .retry {
      padding: 8px 16px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

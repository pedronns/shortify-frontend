import { useState, useMemo } from "react";
import { Table, Button, Container, Toast, ToastContainer, Pagination } from "react-bootstrap";
import { removeLink } from "../handlers/formHandlers";
import "../App.css"
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

const itemsPerPage = 10;

export default function LinkList({ links, onLinkDeleted }) {
  const [showToast, setShowToast] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(links.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return links.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, links]);

  const pageStart =
    links.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const pageEnd = Math.min(
    currentPage * itemsPerPage,
    links.length
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationItems = useMemo(() => {
    let items = [];
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>,
      );
    }
    return items;
  }, [totalPages, currentPage]);

  async function handleDelete(code) {
    try {
      await removeLink(code)
    } catch (error) {
      if (error?.error !== 'NOT_FOUND') {
        console.error(error)
        return
      }
    }
    onLinkDeleted(code)
    setShowToast(true)
  }


  return (
    <Container >
      <p className="h4 mt-1 mb-4 text-center">Links que você criou</p>

      <div className="table-wrapper">
        <Table striped bordered hover variant="dark" className="">
          <thead>
            <tr>
              <th >URL</th>
              <th >Link Criado</th>
              <th >Criado em</th>
              <th >Protegido</th>
              <th >Clicks</th>
              <th >Ações</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (

              currentData.map(item => {
                const shortUrl = `${FRONTEND_URL}/${item.code}`
                const date = new Date(item.createdAt).toLocaleString('pt-BR', { dateStyle: 'short' }) ?? '-'

                return (
                  <tr key={item.code}>
                    <td>{item.url}</td>
                    <td>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortUrl}
                      </a>
                    </td>
                    <td>{date}</td>
                    <td>{item.protected ? 'Sim' : 'Não'}</td>
                    <td>{item.clicks ?? 0}</td>
                    <td>
                      {/* <Button variant="outline-primary" className="mx-1"> Editar </Button> */}
                      <Button variant="outline-danger" className="mx-1" onClick={() => handleDelete(item.code)}>Excluir</Button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-secondary text-center">
                  Sem links criados para exibir
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {currentData.length > 0 &&
        <div className="position-absolute start-50 translate-middle-x">
          <Pagination className="pagination-dark" size="md" >
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {paginationItems}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
          <p className="text-center">Exibindo itens {pageStart}-{pageEnd} de {links.length}</p>
        </div>
      }

      <ToastContainer position="bottom-end">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          bg="danger"
          className=""
          style={{ width: "auto", minWidth: "200px", maxWidth: "300px" }}
        >
          <Toast.Body className="text-white w-100 fw-semibold">
            Link excluído com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>

  );
}

import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const InfoPage = () => {
  const location = useLocation()
  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  useEffect(() => {
    loading()
  }, [])
  return (
    <>
      <div id='head'></div>
      {/* <div>
        {location.state && location.state.location === 'nav' && <div>You came from the NAVBAR</div>}
      </div> */}
      <main className="container">
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">Our library procedures</h1>
            <p className="lead my-3">We want to know your opinion! Please, report us about problems you have and anything that
              comes to your mind.</p>
            <p className="lead mb-0"><a href="#start" className="text-white fw-bold">Continue reading...</a></p>
          </div>
        </div>
        <div className="row g-5" id="start">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
              Procedures
            </h3>
            <article className="blog-post" style={{ background: "white", borderRadius: "12px", padding: "32px" }}>
              <h2 id="find" className="blog-post-title">Find a book</h2>
              <p>
                So, you can find our storage of books at <sup>"All books"</sup>. There you can search for a book by Name
                or by Author, also you can sort the books by the categories.
              </p>
              <hr />
              <h2 id="loan">Loan a book</h2>
              <p>
                To loan a book you just need to make a choise and choose one ;<br />
                After clicking on a book on the "Books" page you will see the option to loan it. Click it and you will
                see
                all the information to make this deal.
                You need to click "agree" and you will move to the "Loans" page (also you can go there by clicking on <sup>"My
                  loans"</sup> )
              </p>
              <hr />
              <h2 id="return">Return a book</h2>
              <p>
                To return a book you need to go the "Loans" page by clicking on <sup>"My loans"</sup>.
                You will see the books you have took already under the header "Active". You can click on one of them to see
                more
                information about this loan,
                after this click you can click the "return" button to execute the returning.
                You will see the book is deleted from your "Active" list and joined into your "History" list.
              </p>
              <hr />
              <h2 id="details">Personal Details</h2>
              <p>
                You can click on the <sup>"Personal Details"</sup> bar to be able to see and update your personal details.
                You can find out there a navigation to your details (personal details and login details)
                and link to your loans if you got lost.
                It's not recommended but you can also close your account there.<br />
                If you want to close your account make sure you already returned the books you took. It's mandatory.
              </p>
              <hr />
              <h3 id="types">We have three loaning types</h3>
              <ol>
                <li>To loan a book for 10 days which can have a fee of 5 ILS per day</li>
                <li>To loan a book for 5 days which can have a fee of 10 ILS per day</li>
                <li>To loan a book for 2 days which can have a fee of 20 ILS per day</li>
              </ol>
              You will see this information before you are loaning a book.
              <hr />
              <h2 id="extra">In Addition</h2>
              <p>
                You can't have more than 3 books in your home. You need to bring one back at least to loan another.<br />
                Also, you can't loan a book you have took already.
              </p>
              <hr />
              <p className="blog-post-meta">April 24, 2022 by Itay Groer</p>
              <hr />
              <blockquote className="blockquote">
                <p>"Life is what happens when you are busy making other plans."</p>
              </blockquote>
            </article>
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: "2rem;" }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic"></h4>
                <p className="mb-0">
                  Hello customer!
                  We are glad to welcome you in our website. It's important for you to know how it works.</p>
              </div>
              <div className="p-4">
                <h4 className="fst-italic pb-3">Navigation</h4>
                <ol className="list-unstyled mb-0">
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#find">find a book</a></li>
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#loan">loan a book</a></li>
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#return">return a book</a></li>
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#details">Personal details</a></li>
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#types">loaning types</a></li>
                  <li className="pb-1"><a style={{ color: "brown;" }} href="#extra">Critical information</a></li>
                </ol>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Talk to us!</h4>
                <ol className="list-unstyled">
                  <li><a style={{ color: "brown;" }} href="#">GitHub</a></li>
                  <li><a style={{ color: "brown;" }} href="#">Insta</a></li>
                  <li><a style={{ color: "brown;" }} href="#">Facebook</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}

export default InfoPage
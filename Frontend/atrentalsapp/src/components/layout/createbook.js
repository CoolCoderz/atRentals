import "./style.css";

export default function Createbook() {
  return (
    <section>
  <div class="card-wrapper">
    <div class="card-title">
      <p>Create new book</p>
    </div>
    <div class="book-id-container">
      <p class="book-id">Book ID:</p>
      <input class="book_input" type="text" value="" />
    </div>

    <div class="row">
      <div class="col">
        <div class="book-cover">
          <img src="https://m.media-amazon.com/images/I/51ueoexgYqL.jpg" />
        </div>
      </div>
      <div class="col">
        <div class="book-publication">
          <p class="book year">1984</p>
          <p class="book author">George orwell</p>
          <p class="book publisher">Penguin Publication</p>
        </div>
        <div class="book-tags">
          <ul class="book-tags-container">
            <li class="book-tag">Fiction</li>
            <li class="book-tag">Politics</li>
            <li class="book-tag">Dystopia</li>
            <li class="book-tag">Politics</li>
            <li class="book-tag">Politics</li>
            <li class="book-tag">Dystopia</li>
          </ul>
        </div>
        <div class="submit">
          <a href="#" class="btn-submit">Submit</a>
        </div>
      </div>
    </div>

  </div>
</section>
  );
}

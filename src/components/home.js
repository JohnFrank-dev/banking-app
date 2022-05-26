import image from "../assets/image.jpg";

function Home() {
  return (
    <div className="row align-items-center p-4">
      <div className="col"></div>
      <div className="card pa-7" style={{ width: "48rem" }}>
        <img src={image} className="card-img-top pt-2" alt="..." />
        <div className="card-body">
          <h3 className="card-title">Bank App</h3>
          <div className="card-text">
            <h6>This is How We Reinvent Banking</h6>
            <p>
              {" "}
              A smart, automatic savings tool. Earlier access to your pay with
              direct deposit. More ways to avoid overdraft and return fees. And
              qualify for extra cash on standby. Why would a bank do that? It’s
              simple. We think everyone deserves a chance at financial success.
            </p>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default Home;

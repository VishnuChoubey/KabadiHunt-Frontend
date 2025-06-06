import { useEffect, useState } from 'react';
import loaderGIF from "../assets/loader.gif";
const Notifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/notification/all?userId=${localStorage.getItem("user_id")}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

        const json = await res.json();
        console.log("Notification data:", json);
        if(res.status === 403) {
          setLoading(true);
          alert("You are not Authorized");
          window.location.href = "/login";
        } else {
          setLoading(false);
        }
        setData(json);
      } catch (err) {
        console.error("error", err);
      } 
    };

    fetchData();
  }, []);

  return (
    <div className="notification-container" style={{ margin: "2%" }}>
      <h1>Notifications :</h1>

      {loading ? (
        <center><img src={loaderGIF} alt="Loading..." style={{ width: '50px' }} /></center>
      ) : (
        <table>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td style={{ backgroundColor: "rgb(146, 210, 255)", padding: "5px" }}>
                  {item.status ? "Request Accepted :" : "Request Rejected :"}
                </td>
                <td
                  style={{
                    backgroundColor:
                      item.status
                        ? "rgb(138, 255, 138)"
                        : "rgb(255, 105, 105)",
                    color: item.status ? "black" : "white",
                    padding: "5px",
                  }}
                >
                  {item.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notifications;

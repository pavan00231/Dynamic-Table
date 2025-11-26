import './Datatables.css'

export default function Loader({ message = "Loading..." }) {
    return (
        <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                <div className="loader"></div>
            </td>
        </tr>
    );
}

import { useState } from "react";
import { NewUser } from "../../../types/manageUser";
import { useGetRandomUser } from "../../../hooks/useGetRamdomUser";

const HomeComponent = () => {
  const [page, setPage] = useState(1); // State quản lý trang hiện tại
  const [selectedRole, setSelectedRole] = useState<string>("All"); // State filter role
  const [selectedGender, setSelectedGender] = useState<string>("All"); // State filter gender
  const { data: users, isLoading } = useGetRandomUser(page);

  const roles = ["All", "Dev", "BA", "QC", "PM"];
  const genders = ["All", "male", "female"];

  // Thêm role và filter
  const newLstUser: NewUser[] = users?.map((user: any) => ({
    ...user,
    role: roles[Math.floor(Math.random() * (roles.length - 1)) + 1], // Random role
  })) || [];

  // Áp dụng filter
  const filteredUsers = newLstUser.filter((user) => {
    const matchRole = selectedRole === "All" || user.role === selectedRole;
    const matchGender = selectedGender === "All" || user.gender === selectedGender;
    return matchRole && matchGender;
  });

  return (
    <div>
      <h1>User Management</h1>
    
      {/* Bộ lọc */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Role:
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ marginLeft: "10px", marginRight: "20px" }}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label>
          Gender:
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Hiển thị người dùng */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredUsers?.map((user) => (
            <div
              key={user.login.uuid}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={user.picture.large}
                alt={user.name.first}
                style={{ borderRadius: "50%", width: "80px", height: "80px" }}
              />
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
              <p>Gender: {user.gender}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: page === index + 1 ? "#007bff" : "#fff",
              color: page === index + 1 ? "#fff" : "#000",
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;

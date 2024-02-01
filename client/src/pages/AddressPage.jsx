import { useEffect, useState } from "react";
import HeadElement from "../components/HeadElement";
import { Fieldset, TextInput, Select, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

const AddressPage = ({ userId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [postCode, setPostCode] = useState("");
  const [detail, setDetail] = useState("");
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/address/${userId}`);
        const { address } = response.data;
        setAddress(address);
      } catch (error) {
        // console.error("Gagal melakukan checkout", error.message);
      }
    };

    getUserAddress();
  }, [userId]);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/address/add", {
        userId,
        name,
        phone,
        province,
        city,
        subdistrict,
        postCode,
        detail,
      });
      close();
      window.location.reload();
    } catch (error) {
      console.error("Gagal menambahkan alamat", error.message);
    }
  };

  return (
    <div>
      <HeadElement pageTitle="Alamat Saya" />
      <div className="container mt-5" style={{ height: 100 + "vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-xl-6 d-flex flex-column gap-3">
            {address.length === 0 ? (
              <h1 className="text-center">Alamat Saya</h1>
            ) : (
              <>
                <h1 className="text-center">Alamat Saya</h1>
                <div className="p-4 border rounded">
                  <ol>
                    {address.map((item) => (
                      <>
                        <li className="mb-4">
                          <span className="d-block">
                            <strong>{item.name}</strong> | {item.phone}
                          </span>
                          <span className="d-block">{item.detail}</span>
                          <span className="d-block">
                            {item.subdistrict}, Kota {item.city}, {item.province}, ID {item.postCode}
                          </span>
                        </li>
                      </>
                    ))}
                  </ol>
                </div>
              </>
            )}
            <button className="btn btn-dark mt-2 p-3" onClick={open}>
              <i className="bi bi-plus-circle"></i> Tambah Alamat Baru
            </button>
          </div>
          <Modal opened={opened} onClose={close} withCloseButton={false} size="md" centered>
            <h3 className="text-center mt-2 mb-3">Tambah Alamat</h3>
            <Fieldset>
              <form onSubmit={handleAddAddress}>
                <TextInput label="Nama" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} required />
                <TextInput label="Nomor Telepon" placeholder="Nomor Telepon Anda" value={phone} onChange={(e) => setPhone(e.target.value)} mt="sm" required />
                <Select label="Provinsi" placeholder="Provinsi" data={[{ label: "Jawa Barat", value: "Jawa Barat" }]} allowDeselect={false} value={province} onChange={(value) => setProvince(value)} mt="sm" required />
                <Select label="Kota" placeholder="Kota" data={[{ label: "Bekasi", value: "Bekasi" }]} allowDeselect={false} value={city} onChange={(value) => setCity(value)} mt="sm" required />
                <Select label="Kecamatan" placeholder="Kecamatan" data={[{ label: "Jatisampurna", value: "Jatisampurna" }]} allowDeselect={false} value={subdistrict} onChange={(value) => setSubdistrict(value)} mt="sm" required />
                <TextInput label="Kode Pos" placeholder="Kode Pos" value={postCode} onChange={(e) => setPostCode(e.target.value)} mt="sm" required />
                <TextInput label="Alamat Lengkap" placeholder="Alamat Anda" value={detail} onChange={(e) => setDetail(e.target.value)} mt="sm" required />
                <button type="submit" className="btn btn-primary mt-4 w-100">
                  KIRIM
                </button>
              </form>
            </Fieldset>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;

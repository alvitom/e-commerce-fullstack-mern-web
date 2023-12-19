import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Stepper, Button, Group, Fieldset, TextInput, px, Select } from "@mantine/core";
import { Helmet } from "react-helmet";

const PersonalInformation = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("/checkout/shipping");
    window.scrollTo(0, 0);
  };
  const prevStep = () => navigate(-1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to server)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Helmet>
        <title>Halaman Checkout</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ height: px(1100) }}>
        <Stepper active={active} allowNextStepsSelect={false} mt="xl" mb="xl" iconSize={60} className="mx-5">
          <Stepper.Step
            label={<h5>Langkah 1</h5>}
            description={<h6>Data Diri</h6>}
            icon={
              <h3>
                <i class="bi bi-person-vcard"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Isi Data Diri dan Alamat</h4>
          </Stepper.Step>
          <Stepper.Step
            label={<h5>Langkah 2</h5>}
            description={<h6>Pengiriman</h6>}
            icon={
              <h3>
                <i class="bi bi-truck"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Pilih Jasa Pengiriman</h4>
          </Stepper.Step>
          <Stepper.Step
            label={<h5>Langkah 3</h5>}
            description={<h6>Pembayaran</h6>}
            icon={
              <h3>
                <i class="bi bi-credit-card"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Pilih Metode Pembayaran</h4>
          </Stepper.Step>
          <Stepper.Completed>
            <h4 className="text-center mt-4">Completed, click back button to get to previous step</h4>
          </Stepper.Completed>
        </Stepper>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <Fieldset>
                <TextInput label="Nama" placeholder="Nama Anda" onChange={handleChange} required />
                <TextInput label="Nomor Telepon" placeholder="Nomor Telepon Anda" mt="md" required />
                <Select label="Provinsi" placeholder="Provinsi" data={["Jawa Barat"]} allowDeselect={false} mt="md" required />
                <Select label="Kota" placeholder="Kota" data={["Bekasi"]} allowDeselect={false} mt="md" required />
                <Select label="Kecamatan" placeholder="Kecamatan" data={["Jatisampurna"]} allowDeselect={false} mt="md" required />
                <Select label="Kelurahan" placeholder="Kelurahan" data={["Jatisampurna", "Jatikarya", "Jatiraden", "Jatirangga", "Jatiranggon"]} allowDeselect={false} mt="md" required />
                <TextInput label="Alamat Lengkap" placeholder="Alamat Anda" mt="md" required />
                <TextInput label="Kode Pos" placeholder="Kode Pos" mt="md" required />
              </Fieldset>
            </div>
          </div>
          <Group justify="center" mt="xl" mb="xl">
            <Button variant="default" onClick={prevStep} size="md">
              Kembali
            </Button>
            <Button onClick={nextStep} size="md">
              Lanjut
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default PersonalInformation;

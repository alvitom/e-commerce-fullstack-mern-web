import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Stepper, Button, Group, px, Fieldset, Select } from "@mantine/core";

const Shipping = ({ services }) => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("/checkout/payment");
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   address: "",
  //   city: "",
  //   postalCode: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic (e.g., send data to server)
  //   console.log("Form submitted:", formData);
  // };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ height: px(1100) }}>
        <Stepper active={active} allowNextStepsSelect={false} mt="xl" mb="xl" iconSize={60}>
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
        <form>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <Fieldset>
                <Select label="Opsi Pengiriman" placeholder="Opsi Pengiriman" data={["Hemat", "Reguler", "Kargo", "Same Day", "Instant"]} allowDeselect={false} mt="md" required />
                <Select label="Jasa Pengiriman" placeholder="Jasa Pengiriman" data={["J&T Express", "JNE Reguler", "Sicepat REG", "Ninja Express", "POS Indonesia"]} allowDeselect={false} mt="md" required />
                <Select label="Tujuan Pengiriman" placeholder="Tujuan Pengiriman" data={["Antar ke Alamat", "Ambil di Tempat"]} allowDeselect={false} mt="md" required />
              </Fieldset>
            </div>
          </div>
          {/* {services?.map((service) => (
          <Card key={service.id} shadow="sm" style={{ marginBottom: "16px" }}>
            <Image src={service.image} alt={service.name} height={120} style={{ objectFit: "cover" }} />
            <Card.Section>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <Badge color="teal">{`Estimated Delivery: ${service.estimatedDelivery}`}</Badge>
            </Card.Section>
          </Card>
        ))} */}
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

export default Shipping;

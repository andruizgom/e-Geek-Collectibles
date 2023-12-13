import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
// import { useAuth0 } from "@auth0/auth0-react";

// const getUser = async () => {
//   const { isAuthenticated, user } = useAuth0();
//   try {
//     if (isAuthenticated && user && user.email) {
//       const { email } = user;
//       const response = await axios.get("/users/email/", email);
//       return response;
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const userData = getUser();

export const orderReady = () => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date and more</Preview>
    <Body style={main}>
      <Container style={container}>
        <Hr style={global.hr} />
        <Section style={message}>
          <Heading style={global.heading}>It's On Its Way.</Heading>
          <Text style={global.text}>
            You order's is on its way. You can see it in your user dashboard.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            You can contact us for any question about you warranty.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={paddingY}>
          <Text style={global.heading}>e-Geek Collectibles</Text>
          <Row style={categories.container}>
            <Column align="center" style={categories.text}>
              Comics
            </Column>
            <Column align="center" style={categories.text}>
              Figures
            </Column>
            <Column align="center" style={categories.text}>
              Games
            </Column>
            <Column align="center" style={categories.text}>
              Outfit and Accessories
            </Column>
            <Column align="center" style={categories.text}>
              Statues
            </Column>
          </Row>
        </Section>
        <Hr style={{ ...global.hr, marginTop: "12px" }} />
        <Section style={paddingY}>
          <Row style={footer.policy}>
            <Column>
              <Text style={footer.text}>Web Version</Text>
            </Column>
            <Column>
              <Text style={footer.text}>Privacy Policy</Text>
            </Column>
          </Row>
          <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
            Please contact us if you have any questions. (If you reply to this
            email, we won't be able to see it.)
          </Text>
          <Text style={footer.text}>
            © 2023 e-Geek Collectibles, Inc. All Rights Reserved.
          </Text>
          <Text style={footer.text}>
            E-GEEK COLLECTIBLES, INC. Street Siempre Viva 123, Spingfield, ??
            00000, USA.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default orderReady;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
    paddingLeft: "10px",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};

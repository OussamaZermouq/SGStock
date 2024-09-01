// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image as PdfImage,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Commande, Produit } from "@prisma/client";
import { getCommandeById } from "@/actions/actions";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    flexGrow: 1,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
  },
  section: {
    gap: 5,
    marginTop: 50,
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  //table
  table: {
    marginTop: 100,
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  fullWidthCol: {
    backgroundColor:"#A9A9A9",
    width: "80%", // Span 3 columns
    height:"40",
    textAlign: "right",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  totalPrice: {
    marginTop: 15,
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});
interface ProduitQte {
  produit: Produit;
  quantite: number;
}
export default function Home() {
  const [randomText, setRandomText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [commande, setCommande] = useState<any>();
  const [produits, setProduits] = useState<ProduitQte[]>();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommandeById(4);
      console.log(data);
      setCommande(data);
      let sum = 0;
      const produitsData = data.produits.map((value) => {
        sum += value.produit.prixProduit * value.quantite;
        const output = {
          produit: value.produit,
          quantite: value.quantite,
        };
        return output;
      });
      setTotal(sum);
      console.log(produitsData);
      setProduits(produitsData);
    };
    fetchData();
    setLoaded(true);
  }, []);

  // Create Document Component
  const MyDocument = (commande: Commande) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <PdfImage
              src={"/cropped-steelaform-LOGO.png"}
              style={styles.image}
            ></PdfImage>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text>
                Le {commande.commande.dateCreation.toLocaleDateString()}
              </Text>
              <Text>ADRESSE STEELAFORM</Text>
            </View>
          </View>
          {/* Content */}
          <View style={styles.section}>
            <Text style={{ fontSize: 15 }}>
              Bon de commande : Nº {commande.commande.code}
            </Text>
            <Text>
              Date commande :{" "}
              {commande.commande.dateCommande.toLocaleDateString()}
            </Text>
            {commande.commande.livraison && (
              <Text>
                Date livraison :{" "}
                {commande.commande.livraison.dateLivraison.toLocaleDateString()}
              </Text>
            )}
            <Text></Text>
            {/* Table Header */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Code Produit</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Nom Produit</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Description</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Qte. Commande</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Prix Unitaire</Text>
                </View>
              </View>
              {/* Table Rows */}
              {produits?.map((row, index) => {
                console.log(row);
                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {row.produit.codeProduit}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {row.produit.nomProduit}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {row.produit.noteProduit}
                      </Text>
                    </View>

                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{row.quantite}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {new Intl.NumberFormat("us-US", {
                          style: "currency",
                          currency: "MAD",
                        }).format(row.produit.prixProduit)}
                      </Text>
                    </View>
                  </View>
                );
              })}
              <View style={styles.tableRow}>
                <View style={styles.fullWidthCol}>
                  <Text style={styles.totalPrice}>Prix Total</Text>
                </View>
                <View style={{...styles.tableCol, 'backgroundColor':'#A9A9A9'}}>
                  <Text style={styles.totalPrice}>
                    {new Intl.NumberFormat("us-US", {
                      style: "currency",
                      currency: "MAD",
                    }).format(total)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  // Function to generate random text
  const generateRandomText = () => {
    const randomWords = [
      "Lorem ipsum dolor sit amet",
      "consectetur adipiscing elit",
      "sed do eiusmod tempor incididunt",
      "ut labore et dolore magna aliqua",
      "Ut enim ad minim veniam",
    ];
    return randomWords[Math.floor(Math.random() * randomWords.length)];
  };

  // Handle button click to generate random text
  const handleClick = () => {
    setRandomText(generateRandomText());
  };

  return (
    <div>
      <h1>Generate PDF with Random Text</h1>
      <Button onClick={handleClick}>Generate PDF</Button>
      {commande && (
        <div>
          <PDFViewer showToolbar={true} width={1000} height={1000}>
            <MyDocument commande={commande} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

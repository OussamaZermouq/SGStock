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
import { Printer } from "lucide-react";
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
    backgroundColor: "#A9A9A9",
    width: "80%", // Span 3 columns
    height: "40",
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
export default function CommandeExport(commandeProps: Commande) {
  const [randomText, setRandomText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [commande, setCommande] = useState<any>(commandeProps);
  console.log(commande);
  const [produits, setProduits] = useState<ProduitQte[]>();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommandeById(4);
      console.log(data);
      //setCommande(data);
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

  const MyDocument = () => {
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
                Le {commande.commandeProps.dateCreation.toLocaleDateString()}
              </Text>
              <Text>ADRESSE STEELAFORM</Text>
            </View>
          </View>
          {/* Content */}
          <View style={styles.section}>
            <Text style={{ fontSize: 15 }}>
              Bon de commande : Nº {commande.commandeProps.code}
            </Text>
            <Text>
              Date commande :{" "}
              {commande.commandeProps.dateCommande.toLocaleDateString()}
            </Text>
            {commande.commandeProps.livraison && (
              <Text>
                Date livraison :{" "}
                {commande.commandeProps.livraison.dateLivraison.toLocaleDateString()}
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
                <View
                  style={{ ...styles.tableCol, backgroundColor: "#A9A9A9" }}
                >
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

  return (
    <div>
      {commande && (
        <div>
          <PDFDownloadLink document={<MyDocument />} fileName={commande.commandeProps.code}>
            <Button>
              <Printer />
            </Button>
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

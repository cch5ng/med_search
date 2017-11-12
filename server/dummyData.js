import Post from './models/post';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
     return;
    }

    // ref drugs identifiers
    const post1 = new Post({ name: "{12 (Acetaminophen 325 MG / Chlorpheniramine Maleate 2 MG / Dextromethorphan Hydrobromide 10 MG / Phenylephrine Hydrochloride 5 MG Oral Tablet) / 12 (Acetaminophen 325 MG / Dextromethorphan Hydrobromide 10 MG / Phenylephrine Hydrochloride 5 MG Oral Tablet) } Pack",
      synonym: "12 daytime (acetaminophen 325 MG / dextromethorphan HBr 10 MG / phenylephrine HCl 5 MG Oral Tablet) / 12 nighttime (acetaminophen 325 MG / chlorpheniramine maleate 2 MG / dextromethorphan HBr 10 MG / phenylephrine HCl 5 MG Oral Tablet) Pack",
      rxcui: "1112908",
      frequency: 1 
    });
    const post2 = new Post({ name: "Acetaminophen 500 MG / Caffeine 65 MG Disintegrating Oral Tablet [Excedrin Quick Tab]",
      synonym: "APAP 500 MG / Caffeine 65 MG Disintegrating Oral Tablet [Excedrin Quick Tab]", 
      rxcui: "702615", 
      frequency: 1 
    });
    const post3 = new Post({ name: "Acetaminophen 325 MG / Guaifenesin 200 MG Oral Capsule [Comtrex Deep Chest Cold Non Drowsy]",
      synonym: "APAP 325 MG / Guaifenesin 200 MG Oral Capsule [Comtrex Deep Chest Cold Non Drowsy]", 
      rxcui: "707199",
      frequency: 1 });
    const post4 = new Post({ name: "Acetaminophen 500 MG / Codeine Phosphate 60 MG Oral Tablet [Codrix]",
      synonym: "Codrix 500/60 Oral Tablet",
      rxcui: "994051",
      frequency: 1 });
    const post5 = new Post({ name: "Acetaminophen 32 MG/ML / Chlorpheniramine Maleate 0.2 MG/ML / Dextromethorphan Hydrobromide 1 MG/ML Oral Solution",
      synonym: "acetaminophen 160 MG / chlorpheniramine maleate 1 MG / dextromethorphan HBr 5 MG per 5 ML Oral Solution",
      rxcui: "1038876",
      frequency: 1 });

    Post.create([post1, post2, post3, post4, post5 ], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}

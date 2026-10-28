export type GuideSection = { h: string; p?: string[]; ul?: string[] };
export type Guide = { slug: string; title: string; short: string; intro: string; sections: GuideSection[]; updated: string };

const NOTE = 'This guide is general information to help you prepare. Rules, fees and taxes change often in Pakistan, so please confirm the latest requirements with the relevant government office or a qualified lawyer or tax adviser before you pay or sign anything.';

export const GUIDES: Guide[] = [
  {
    slug: 'buying-property-rawalpindi-checklist',
    title: 'Buying Property in Rawalpindi: What We Check Before Delivery',
    short: 'The checks a careful property agency makes on ownership, papers, location and price before a buyer pays.',
    updated: 'October 2026',
    intro: 'Buying a house, shop, office or plot is usually the biggest payment a family or business makes. A good agency does more than introduce a buyer to a seller. Below are the checks we recommend on every deal in Rawalpindi and Islamabad, whether you buy through us or anyone else.',
    sections: [
      { h: '1. Confirm who really owns the property', p: ['Ask to see the original ownership papers, not photocopies. Depending on the property this may be the registered sale deed (registry), the latest transfer record, an allotment letter or a society file.', 'Match the name on the papers with the seller\'s original CNIC. If the seller is acting for the owner, ask for a proper registered power of attorney and verify it is still valid.'] },
      { h: '2. Check for disputes, loans and pending claims', ul: ['Ask the seller in writing whether the property has any court case, loan, mortgage or claim by relatives or co-owners.', 'Check the latest land or property record at the relevant government office.', 'If the property is in a housing society, ask the society office for a clearance that no dues or restrictions are pending.'] },
      { h: '3. Visit the property in person', p: ['Photos and videos can hide problems. Visit at different times of the day. Look at the condition of the building, access road, water, gas, electricity and drainage, and talk to neighbours or nearby shopkeepers.', 'For plots, confirm the exact boundaries and size on the ground and that the plot you see is the plot named in the papers.'] },
      { h: '4. Check the price against the market', p: ['Compare the asking price with similar properties in the same street or block. A price far below the market is often a warning sign, not a bargain.', 'Remember the total cost is more than the price: government taxes, registration costs, agent commission and any society transfer fee all add up. Ask for these figures before you agree on a deal.'] },
      { h: '5. Put every agreement in writing', ul: ['Price, payment schedule, token amount and handover date should be written and signed by both sides.', 'Pay by bank transfer or cheque where possible, and keep every receipt.', 'Do not hand over large cash amounts without a signed receipt and a witness.'] },
      { h: '6. Handover and transfer', p: ['Complete the transfer at the proper government office so the property is registered in the buyer\'s name, and collect the original documents. Take over utility connections and clear any outstanding bills in the seller\'s name.', 'Only take possession once the transfer steps and payments agreed in writing are complete.'] },
      { h: 'How Future Property Agency helps', p: ['Our office in Bajour Tower, Gunjmandi, helps buyers go through these steps, arranges visits and explains what each document means. We do not guarantee profit or price rises, but we aim to make every deal clear and well documented.'] },
    ],
  },
  {
    slug: 'documents-needed-to-rent-property',
    title: 'Documents Needed to Rent a House, Shop or Office',
    short: 'A simple list of what a tenant and a landlord should prepare for a rental agreement.',
    updated: 'October 2026',
    intro: 'Renting goes smoothly when both sides prepare their papers in advance. This guide explains what tenants and landlords commonly need in Rawalpindi, so you do not lose a good property while looking for a missing document.',
    sections: [
      { h: 'Documents a tenant usually needs', ul: ['Copy of CNIC (and the CNIC of the person who will sign the agreement).', 'Recent passport-size photographs.', 'For a business tenant: copy of NTN or business registration where available, and details of the business.', 'Proof of income or a reference, if the landlord asks for it.', 'Details of a guarantor or reference person, if requested.', 'Details of everyone who will live in or use the property.'] },
      { h: 'Documents a landlord should provide', ul: ['Proof of ownership, such as the registry, allotment or society papers.', 'Copy of CNIC.', 'Recent electricity, gas and water bills, so the tenant knows the meters and any dues.', 'Authority letter or power of attorney if someone else is renting on the owner\'s behalf.'] },
      { h: 'The rental agreement', p: ['Always sign a written rental agreement on proper stamp paper. It should clearly state the names and CNIC numbers of both sides, the full address of the property, monthly rent, security deposit, advance rent, the start date and length of the tenancy, and who pays utility bills and repairs.', 'It should also explain how much notice each side must give to end the tenancy, how and when rent increases happen, and what happens to the security deposit when the tenant leaves.'] },
      { h: 'Police tenant registration', p: ['In Punjab, owners are normally expected to report new tenants to the police through the official tenant registration process. Check the current procedure with your local police station or the official Punjab Police service, and keep a copy of the confirmation.'] },
      { h: 'Tips for tenants', ul: ['Inspect the property carefully and note any existing damage in the agreement.', 'Pay rent by bank transfer where possible and keep every receipt.', 'Take photos of meters on the day you move in.'] },
      { h: 'Tips for landlords', ul: ['Verify the tenant\'s identity and keep a copy of the CNIC.', 'Do not rely on verbal promises, write everything down.', 'Review and renew the agreement on time.'] },
      { h: 'Looking for a rental in Rawalpindi?', p: ['Browse our current rental listings, or contact Future Property Agency to tell us your budget and area. We can help you find a suitable home, shop or office and prepare the paperwork.'] },
    ],
  },
  {
    slug: 'property-registry-requirements',
    title: 'How to Complete a Property Registry: Documents and Steps',
    short: 'What buyers and sellers should prepare to register a property transfer in Rawalpindi.',
    updated: 'October 2026',
    intro: 'A registry is the official record that a property has been transferred to a new owner. Without a proper registry, a buyer may find it hard to prove ownership later. This guide explains the usual steps and papers in Punjab. Procedures are updated from time to time, so always confirm the latest requirements before you go to the office.',
    sections: [
      { h: 'What you usually need from the seller', ul: ['Original title documents (previous registry, transfer letter, allotment letter or society file, depending on the property).', 'Original CNIC.', 'Recent photographs.', 'Latest property tax or utility receipts where required.', 'A no-objection or clearance letter from the housing society if the property is inside one.'] },
      { h: 'What you usually need from the buyer', ul: ['Original CNIC.', 'Recent photographs.', 'Tax details, since filer status affects the taxes charged on a purchase (see our FBR guide).', 'The payment through proper banking channels, as agreed in the sale agreement.'] },
      { h: 'The usual steps', ul: ['Agree on the price and sign a written sale agreement.', 'Verify the seller\'s documents and clear any dues.', 'Pay the government taxes and fees due on the transfer and collect the receipts.', 'Prepare the sale deed with the required stamp duty.', 'Both sides appear at the sub-registrar office with two witnesses, so identity and signatures can be verified.', 'After registration, apply for the property record to be updated in the buyer\'s name, and collect the original documents.'] },
      { h: 'Common costs to plan for', p: ['A registry normally involves several costs, for example federal advance taxes, provincial stamp duty and other transfer charges, society transfer fees where they apply, and professional or agent fees. The exact amounts depend on the property value and the current rules, so ask for a written estimate before you start.'] },
      { h: 'Mistakes to avoid', ul: ['Paying the full amount before the registry is complete.', 'Accepting photocopies instead of original documents.', 'Letting the registry be made for a lower value than the real price. This can cause legal and tax problems later.', 'Trusting verbal promises that the paperwork "will be done later".'] },
      { h: 'Need help?', p: ['Future Property Agency can explain the steps for your specific property and connect you with the right professionals. Visit our office in Gunjmandi or call us on the number below.'] },
    ],
  },
  {
    slug: 'fbr-filer-vs-non-filer-property-rules',
    title: 'FBR Filer vs Non-Filer: What It Means When Buying or Selling Property',
    short: 'A simple explanation of how filer status affects property taxes in Pakistan.',
    updated: 'October 2026',
    intro: 'In Pakistan, whether you are on the FBR Active Taxpayer List (ATL) can change how much tax you pay when you buy or sell property. This page explains the idea in simple words. We do not list exact percentages here because they change with every budget, so please check the current figures before any deal.',
    sections: [
      { h: 'What is a filer?', p: ['A filer is a person or business who files an income tax return with the Federal Board of Revenue (FBR) and appears on the Active Taxpayer List. A non-filer is someone who is not on that list when the tax is collected.'] },
      { h: 'Which taxes apply to property?', ul: ['Advance tax on the sale of property, collected from the seller (Section 236C of the Income Tax Ordinance).', 'Advance tax on the purchase of property, collected from the buyer (Section 236K).', 'Other costs such as provincial stamp duty and registration charges, which are separate from FBR taxes.'] },
      { h: 'Why filer status matters', p: ['Non-filers generally pay several times more advance tax than filers on the same property. For filers these taxes are normally adjustable against the final income tax, which means they are not always a final cost.', 'Recent budgets have reduced and simplified the rates for filers, and have also changed how late filers are treated. Because the figures are revised often and different sources report them differently, always check the current rate with FBR or a tax adviser.'] },
      { h: 'How to check your status', ul: ['Search your CNIC in the FBR Active Taxpayer List on the official FBR website.', 'If you are not on the list, speak to a tax professional about filing your return before you buy or sell.', 'Check the status of the other party too, because it can affect the taxes collected in the deal.'] },
      { h: 'How the tax is calculated', p: ['Advance tax is calculated on a value set by the rules, which may be the price paid or an official valuation value, whichever the law requires for that case. Get the correct taxable value from the registration office or a tax adviser before you fix the deal.'] },
      { h: 'Overseas Pakistanis', p: ['Some overseas Pakistanis who meet FBR\'s conditions can be treated at filer rates. Check the official FBR guidance for the current conditions.'] },
      { h: 'Our advice', p: ['Ask for the tax estimate in writing before you agree on a price, check filer status early, and use a qualified tax adviser for your own situation. Future Property Agency is a property agency, not a tax adviser, so we can point you to the right steps but not replace professional tax advice.'] },
    ],
  },
  {
    slug: 'avoid-property-fraud-pakistan',
    title: 'How to Avoid Property Fraud: 10 Important Precautions',
    short: 'Ten practical checks that help buyers and tenants avoid fake documents, double sales and token-money scams.',
    updated: 'October 2026',
    intro: 'Property fraud can cost people their savings. Most scams use the same tricks: fake papers, pressure to pay quickly and promises that cannot be checked. These ten precautions apply to buyers, sellers and tenants.',
    sections: [
      { h: '1. Never pay on the first visit', p: ['Do not pay token money before you have seen the original papers and met the real owner or an authorised person.'] },
      { h: '2. Meet the owner and verify the CNIC', p: ['Check the original CNIC against the name in the ownership papers. Be careful if the owner is "abroad" and everything is handled by a stranger.'] },
      { h: '3. Check the papers at the official office', p: ['Do not rely only on what the seller or agent shows you. Verify the ownership record at the relevant government office.'] },
      { h: '4. Beware of double sales', p: ['Some sellers sell the same plot or shop to more than one buyer. A clear, recent record check and a proper registry protect you.'] },
      { h: '5. Be careful with unapproved projects', p: ['Before buying a plot in a housing scheme, confirm that the project is approved by the relevant authority and that the plot exists on the ground.'] },
      { h: '6. Distrust prices that look too good', p: ['Prices far below the market, "today only" deals and requests for urgent cash are common warning signs.'] },
      { h: '7. Use banks, not cash', p: ['Pay by bank transfer or crossed cheque to the named owner and keep a signed receipt for every payment.'] },
      { h: '8. Put everything in writing', p: ['Price, payment dates, handover date and what happens if either side backs out should be written and signed with witnesses.'] },
      { h: '9. Use a trusted, local agency', p: ['Choose an agency with a real office you can visit. Ask for references and check online reviews, and keep your own copies of all documents.'] },
      { h: '10. Do not skip the registry', p: ['A handwritten agreement or a "file" alone is not enough. Complete the transfer at the proper office so the property is recorded in your name.'] },
      { h: 'If you think you have been cheated', p: ['Stop further payments, keep all documents and messages, and contact a lawyer and the relevant authorities as soon as possible.'] },
    ],
  },
];

export const GUIDE_NOTE = NOTE;

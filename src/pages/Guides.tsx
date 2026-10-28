import { Link, useParams } from 'react-router-dom';
import { useSeo, useJsonLd } from '../hooks/useSeo';
import { useApp } from '../context/AppContext';
import { GUIDES, GUIDE_NOTE } from '../data/guides';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';
import { NotFound } from './Info';

export function GuidesIndex() {
  useSeo('Property Guides', 'Simple guides on buying, renting, registry, FBR filer rules and avoiding fraud when dealing in property in Rawalpindi and Islamabad.');
  return <><section className="pagehead"><div className="container"><h1>Property guides</h1>
    <p className="muted">Clear, practical guides for buyers, sellers and tenants in Rawalpindi and Islamabad.</p></div></section>
    <div className="container section"><div className="pgrid">{GUIDES.map(g => <div className="card pad" key={g.slug}>
      <h3>{g.title}</h3><p className="muted">{g.short}</p><Link className="btn ghost" to={`/guides/${g.slug}`}>Read guide</Link></div>)}</div></div></>;
}

export function GuideDetail() {
  const { slug } = useParams();
  const { settings: s } = useApp();
  const g = GUIDES.find(x => x.slug === slug);
  useSeo(g ? g.title : 'Guide not found', g ? g.short : undefined);
  useJsonLd('guide-article', g ? { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.short, mainEntityOfPage: `https://futurepropertyagency.com/guides/${g.slug}`, author: { '@type': 'Organization', name: s.agencyName }, publisher: { '@type': 'Organization', name: s.agencyName, logo: { '@type': 'ImageObject', url: 'https://futurepropertyagency.com/logo.png' } } } : null);
  if (!g) return <NotFound />;
  const others = GUIDES.filter(x => x.slug !== g.slug);
  return <div className="container section prose">
    <p className="small"><Link to="/guides">← All guides</Link></p>
    <h1>{g.title}</h1><p className="muted small">Last updated: {g.updated}</p>
    <p>{g.intro}</p>
    {g.sections.map(sec => <section key={sec.h}><h2>{sec.h}</h2>
      {sec.p?.map((t, i) => <p key={i}>{t}</p>)}
      {sec.ul && <ul>{sec.ul.map((t, i) => <li key={i}>{t}</li>)}</ul>}</section>)}
    <p className="muted small"><em>{GUIDE_NOTE}</em></p>
    <div className="card pad cta row between"><span>Questions? Talk to {s.agencyName}.</span><div className="row"><CallButton className="btn primary" /><WhatsAppButton /></div></div>
    <h2>More guides</h2><ul>{others.map(o => <li key={o.slug}><Link to={`/guides/${o.slug}`}>{o.title}</Link></li>)}</ul>
  </div>;
}

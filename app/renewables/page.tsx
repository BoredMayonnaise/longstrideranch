import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Renewables",
  description:
    "Long Stride Ranch Renewables upcycles manure and used equine bedding into organic fertilizer and renewable fuels, keeping stable waste out of landfills.",
  alternates: { canonical: "/renewables" },
};

const steps = [
  {
    heading: "Collect",
    body: "Manure and used bedding are separated at the source, so what leaves the barn is already clean feedstock rather than mixed waste.",
  },
  {
    heading: "Convert",
    body: "Managed composting breaks the material down under controlled heat — the same process that kills weed seed and pathogens.",
  },
  {
    heading: "Return",
    body: "The finished product goes back out as organic fertilizer and renewable fuel instead of into a landfill.",
  },
];

export default function RenewablesPage() {
  const { sam } = site.people;

  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Renewables" />
          <p className="eyebrow">Long Stride Ranch Renewables</p>
          <h1>Help us keep manure out of landfills.</h1>
          <p className="lede">
            We are passionate about sustainability and are expanding operations to upcycle manure
            and used equine bedding into organic fertilizer and renewable fuels.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="reveal">
              <h2>The barn&rsquo;s least glamorous output, put to work.</h2>
              <div className="prose">
                <p>
                  A single horse produces roughly fifty pounds of manure a day. Multiply that by a
                  barn, then by a region as horse-dense as Palm Beach County, and stable waste
                  becomes a genuine disposal problem &mdash; one usually solved by hauling it to a
                  landfill.
                </p>
                <p>
                  It does not have to end there. Manure and used bedding are carbon and nutrients.
                  Composted properly they become fertilizer that farms want; processed further, they
                  become fuel.
                </p>
              </div>
            </div>
            <div className="media media--wide reveal">
              <img
                src="/img/scene-renewables.svg"
                alt="Composting windrows steaming beside a finished pile with a seedling growing from it"
                width={800}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <p className="eyebrow">The process</p>
          <h2 style={{ maxWidth: "18ch" }}>
            From stall to soil, without a detour through the dump.
          </h2>
          <ol className="steps" style={{ marginTop: "var(--space-7)" }}>
            {steps.map((step) => (
              <li className="reveal" key={step.heading}>
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Get involved
          </p>
          <h2>Run a barn with a waste problem?</h2>
          <p className="lede">
            We are expanding capacity and are glad to hear from neighboring farms, haulers and
            growers. Sam runs this side of the business.
          </p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: "var(--space-6)" }}>
            <a className="btn btn--primary" href={`mailto:${sam.email}`}>
              Email {sam.name}
            </a>
            <a className="btn btn--ghost" href={`tel:${sam.tel}`}>
              {sam.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

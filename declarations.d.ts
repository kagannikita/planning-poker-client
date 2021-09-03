declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.png";
declare module "*.svg" {
  const component: React.FC<React.SVGProps<SVGAElement>>;

  export default component;
}

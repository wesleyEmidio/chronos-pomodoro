import styles from './styles.module.css';

type HeadingProps = {
  children: React.ReactNode;
};

export function Heading({ children }: HeadingProps) {
  //DESISTRUTURAÇÃO
  //export function Heading(props: HeadingProps) {
  //1ºForma: const children = props.children;
  //2ºForma: const { children } = props;
  return <h1 className={styles.heading}>{children}</h1>;
}

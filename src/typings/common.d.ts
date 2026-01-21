declare namespace Common {
  /**
   * Strategy mode
   * [status, callback function executed when true]
   */
  type StrategyAction = [boolean, () => void];

  /** option data */
  type OptionWithKey<K> = { value: K; label: string };

  type MenuItemWithData = { key: string; label?: string | ReactNode; data?: any };

  type EmitEvent<T = any> = {
    visible: boolean;
    data?: T;
  };

  type StringOrNumber = string | number;
}

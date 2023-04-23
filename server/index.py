random_state = 0
classifier = [XGBClassifier(random_state = random_state),
              LogisticRegression(random_state = random_state),
              KNeighborsClassifier(),
              SVC(random_state = random_state),
              DecisionTreeClassifier(random_state = random_state),
              RandomForestClassifier(random_state = random_state),
              CatBoostClassifier(random_state = random_state)]

# Decision Tree
dtg = {"min_samples_split" : range(10,500,20),
                "max_depth": range(1,20,2)}

# SVM
svmg = {"kernel" : ["rbf"],
                 "gamma": [0.001, 0.01, 0.1, 1],
                 "C": [1,10,50,100,200,300,1000]}

# Random Forest
rfg = {"max_features": ['auto', 'sqrt', 'log2'],
                "n_estimators":[300,500],
                "criterion":["gini"],
                'max_depth' : [4,5,6,7,8,9,10,12],}

# Logistic Regression
lrg = {"C":np.logspace(-3,3,7),
                    "penalty": ["l1","l2"]}

# KNN
knng = {"n_neighbors": np.linspace(1,19,10, dtype = int).tolist(),
                 "weights": ["uniform","distance"],
                 "metric":["euclidean","manhattan"]}

#Catboost
catg =  {'max_depth': [3,4,5],'n_estimators':[100, 200, 300]}

#XGBRF
xgbrfg = {
        'min_child_weight': [1, 5, 10],
        'gamma': [0.5, 1, 1.5, 2, 5],
        'subsample': [0.6, 0.8, 1.0],
        'colsample_bytree': [0.6, 0.8, 1.0],
        'max_depth': [3, 4, 5]
        }

classifier_param = [xgbrfg, lrg, knng, svmg, dtg, rfg, catg]